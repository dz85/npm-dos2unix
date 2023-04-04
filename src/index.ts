import fs from 'node:fs'
import stream from 'node:stream'
import { Args, Command } from '@oclif/core'
import { globby } from 'globby'
import { nanoid } from 'nanoid'
import mmmagic from 'mmmagic'
import AutoDetectDecoderStream from 'autodetect-decoder-stream'

class CRLF2LFTransform extends stream.Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: stream.TransformCallback): void {
    if (!Buffer.isBuffer(chunk))
      return callback(new Error('CRLF2LFTransform needs buffers as its input.'))

    this.push(chunk.toString().replace(/\r\n/g, '\n'))
    callback()
  }
}

export default class DefaultCommand extends Command {
  static summary = 'A dos2UniX-like command-line tool written in Nodejs'

  static examples = [
    '$ <%= config.bin %> **/*.js',
  ]

  static flags = {
    // 'ignore-file': Flags.file({description: 'specifies intentionally files to ignore', default: '.gitignore'}),
    // dir: Flags.directory({description: 'the directory to be scanned', default: '.'}),
    // file: Flags.file({description: 'the file to be scanned'}),
  }

  static args = {
    glob: Args.string({ description: 'the glob pattern to be scanned', default: '**/*' }),
  }

  static strict = false

  async run(): Promise<void> {
    const { args } = await this.parse(DefaultCommand)

    const paths = await globby(args.glob, { gitignore: true })

    const getMagicType = (path: string): Promise<{
      mimeType?: string
      encoding?: string
    }> => new Promise((resolve, reject) => {
      const magic = new mmmagic.Magic(mmmagic.MAGIC_MIME_ENCODING | mmmagic.MAGIC_MIME_TYPE)
      magic.detectFile(path, (err, result) => {
        if (err) { reject(err) }
        else if (typeof result === 'string') {
          const results = result.split('; charset=')
          this.log(path, result)
          resolve({
            mimeType: results[0],
            encoding: results[1],
          })
        }
        else { resolve({}) }
      })
    })

    await Promise.all(paths.map(async (path) => {
      const stats = await fs.promises.stat(path)
      if (stats.isFile()) {
        const { mimeType, encoding } = await getMagicType(path)
        if (typeof mimeType === 'string' && mimeType.startsWith('text/') && typeof encoding === 'string') {
          const outputPath = `${path}.${nanoid(4)}`
          // https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams
          const input = fs.createReadStream(path)
          const encodingTranslate = new AutoDetectDecoderStream()
          const lfTranslate = new CRLF2LFTransform()
          const output = fs.createWriteStream(outputPath)
          await stream.promises.pipeline([input, encodingTranslate, lfTranslate, output])
          await fs.promises.unlink(path)
          await fs.promises.rename(outputPath, path)
          this.log(`${path} 转化完成`)
        }
      }
    }))
  }
}
