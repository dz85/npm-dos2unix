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
       * linux下的rename是原子操作
       * @see https://man7.org/linux/man-pages/man2/rename.2.html#:~:text=will%20be%20atomically-,replaced,-%2C%20so%0A%20%20%20%20%20%20%20that%20there
       */
        await fs.promises.rename(outputPath, path)
        // this.log(`${path} 转化完成`)
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
