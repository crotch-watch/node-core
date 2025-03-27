const { Transform, pipeline } = require("node:stream")

class Decrypt extends Transform {
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
  const readHandle = await open("./encrypted.txt", read)
  const writeHandle = await open("./decrypted.txt", write)

  const decrypt = new Decrypt()

  pipeline(
    readHandle.createReadStream(),
    decrypt,
    writeHandle.createWriteStream(),
    (pipelineError) => {
      if (pipelineError) return console.log(pipelineError)

      close("./src.txt")
      decrypt.destroy()
      close("./encrypted.txt")
    }
  )
}

void main()
