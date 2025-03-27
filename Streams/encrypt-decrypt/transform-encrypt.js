const { Transform, pipeline } = require("node:stream")

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; ++i) {
      chunk[i] = 255 - chunk[i]
    }

    this.push(chunk)
  }
}

const { open, close } = require("node:fs/promises")

const main = async () => {
  const read = "r"
  const write = "w"
  const readHandle = await open("./src.txt", read)
  const writeHandle = await open("./encrypted.txt", write)

  const encrypt = new Encrypt()

  pipeline(
    readHandle.createReadStream(),
    encrypt,
    writeHandle.createWriteStream(),
    (pipelineError) => {
      if (pipelineError) return console.log(pipelineError)

      close("./src.txt")
      encrypt.destroy()
      close("./encrypted.txt")
    }
  )
}

void main()
