import buffer from 'node:buffer'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import stream from 'node:stream'
import { program } from 'commander'
import { globby } from 'globby'
import { nanoid } from 'nanoid'
import { WASMagic } from 'wasmagic'
import AutoDetectDecoderStream from 'autodetect-decoder-stream'

const pkg = ((createRequire(import.meta.url))('../package.json')) as {
  name: string
  description: string
  version: string
}

class CRLF2LFTransform extends stream.Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: stream.TransformCallback): void {
    if (!buffer.Buffer.isBuffer(chunk))
      return callback(new Error('CRLF2LFTransform needs buffers as its input.'))

    this.push(chunk.toString().replace(/\r\n/g, '\n'))
    callback()
  }
}

function main() {
  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .argument('[glob]', 'the glob pattern to be scanned', '**/*')
    .action(async (glob) => {
      /**
       * `globby`基于`fast-glob`，和`lint-staged`一样，都使用`micromatch`来处理`glob`模式匹配；
       * 同时也支持`.gitignore`、`.ignore`等配置文件；
       * @see https://github.com/mrmlnc/fast-glob#:~:text=This%20package%20uses%20a%20micromatch
       * @see https://github.com/okonet/lint-staged#Configuration:~:text=This%20package%20uses%20micromatch
       */
      const paths = await globby(glob as string, { gitignore: true })

      const getMagicType = async (path: string): Promise<string> => {
        const magic = await WASMagic.create()
        const buf = await fs.promises.readFile(path)
        return magic.getMime(buf)
      }

      const transformAndSave = async (path: string): Promise<void> => {
        const outputPath = `${path}.${nanoid(4)}`
        // https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams
        const input = fs.createReadStream(path)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const encodingTranslate = (new AutoDetectDecoderStream()) as stream.Transform
        const lfTranslate = new CRLF2LFTransform()
        const output = fs.createWriteStream(outputPath)
        await stream.promises.pipeline([input, encodingTranslate, lfTranslate, output])
        /**
       * linux 下的 rename 是原子操作，这在官方资料很清晰指出
       * @see https://man7.org/linux/man-pages/man2/rename.2.html#:~:text=will%20be%20atomically-,replaced,-%2C%20so%0A%20%20%20%20%20%20%20that%20there
       * windows 下（包括 NTFS 和 FAT）对于同一目录内的重命名是操作单个元数据来实现（类似linux），该操作要么发生，要么不发生，要么破坏文件系统，因此始终是原子的
       * @see https://social.msdn.microsoft.com/Forums/sharepoint/en-US/449bb49d-8acc-48dc-a46f-0760ceddbfc3/movefileexmovefilereplaceexisting-ntfs-same-volume-atomic?forum=windowssdk
       */
        await fs.promises.rename(outputPath, path)
        console.log(`${path} finished!`)
      }

      await Promise.all(paths.map(async (path) => {
        const stats = await fs.promises.stat(path)
        if (stats.isFile()) {
          const mimeType = await getMagicType(path)
          if (typeof mimeType === 'string' && mimeType.startsWith('text/'))
            await transformAndSave(path)
        }
      }))
    })
    .parse()
}

export { main }
