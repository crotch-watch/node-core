const { open } = require("node:fs/promises")
const { Buffer } = require("node:buffer")

const main = async () => {
  const writable = "./dest.txt"
  const readable = "./src.txt"

  const readHandle = await open(readable, "r")
  const writeHandle = await open(writable, "w")

  let bytesRead = -1
  const default_read = 16 * 1024

  while (bytesRead !== 0) {
    const result = await readHandle.read()

    bytesRead = result.bytesRead

    if (result.buffer.length < default_read) {
      const newBufferLength = result.buffer.findIndex((el) => el === 0)
      const newBuffer = Buffer.allocUnsafe(newBufferLength)
      result.buffer.copy(newBuffer, 0, 0, newBufferLength)
      await writeHandle.write(newBuffer)
    }

    await writeHandle.write(result.buffer)
  }

  await readHandle.close()
  await writeHandle.close()
}

void main()
