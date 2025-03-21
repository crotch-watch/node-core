const { Buffer } = require("node:buffer")
const { open } = require("node:fs/promises")

// Time - 3.3s
// CPU - 6%
// Mem - 40 MB
const main = async function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  const fileHandle = await open(FILENAME, FLAG)
  const writeStream = fileHandle.createWriteStream()

  let ITER = 0

  const writeMany = function () {
    while (ITER < WRITES) {
      const buffer = Buffer.from(" " + ITER + " ")
      const shouldWrite = writeStream.write(buffer)

      ITER += 1

      // stop writing to drain
      if (!shouldWrite) return

      // Last write when buffer isn't filled
      if (ITER === WRITES - 1) {
        writeStream.end(buffer)
        return
      }
    }
  }

  writeStream.on("drain", () => {
    /* resume writing to stream*/
    writeMany()
  })

  console.time("timer")
  writeStream.on("finish", () => {
    console.timeEnd("timer")
    fileHandle.close()
  })

  writeMany()
}

void main()
