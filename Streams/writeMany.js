const { Buffer } = require("node:buffer")
const { open } = require("node:fs/promises")

// Time - 17s
// CPU - 26%
// Mem - 42.5 MB
const main = async function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  const fileHandle = await open(FILENAME, FLAG)

  console.time("timer")
  for (let i = 0; i < WRITES; i++) {
    const numString = " " + i.toString() + " "
    const buffer = Buffer.from(numString, "utf8")
    await fileHandle.write(buffer)
  }
  console.timeEnd("timer")

  await fileHandle.close()
}

void main()
