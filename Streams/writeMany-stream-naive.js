const { Buffer } = require("node:buffer")
const { open } = require("node:fs/promises")

// Time - 925ms
// CPU - 8%
// Mem - 220 MB
const main = async function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  const fileHandle = await open(FILENAME, FLAG)
  const writeStream = fileHandle.createWriteStream()

  console.time("timer")
  for (let i = 0; i < WRITES; i++) {
    const numString = " " + i.toString() + " "
    const buffer = Buffer.from(numString, "utf8")
    writeStream.write(buffer)
  }
  console.timeEnd("timer")

  await fileHandle.close()
}

void main()
