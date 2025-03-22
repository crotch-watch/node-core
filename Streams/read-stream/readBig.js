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

  // builds backpressure as read is faster than write
  // while not draining writeStream
  readStream.on("data", (chunk) => writeStream.write(chunk))
}

void main()
