const { open } = require("node:fs/promises")

const main = async function () {
  const readable = "./src.txt"
  const readFlag = "r"
  const writable = "./dest.txt"
  const writeFlag = "w"

  const WATERMARK = 64 * 1024 // bytes

  const readHandler = await open(readable, readFlag)
  const writeHandler = await open(writable, writeFlag)

  const readStream = readHandler.createReadStream({ highWaterMark: WATERMARK })
  const writeStream = writeHandler.createWriteStream()

  // data is still being buffered but in control.
  readStream.on("data", (chunk) => {
    const continueWrite = writeStream.write(chunk)
    if (!continueWrite) readStream.pause()
  })

  writeStream.on("drain", () => {
    readStream.resume()
  })
}

void main()
