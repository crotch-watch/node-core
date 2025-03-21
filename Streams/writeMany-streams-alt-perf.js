const { open } = require("node:fs/promises")

// Time - 105ms
// CPU - 7%
// Mem - 40 MB
// NOTE: disk usage was increased significantly
const main = async function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  const fileHandle = await open(FILENAME, FLAG)
  const writeStream = fileHandle.createWriteStream()

  const { writableHighWaterMark } = writeStream

  let ITER = 0
  let output = ""

  const writeMany = function () {
    while (ITER < WRITES) {
      // string is concat till it reaches watermark
      output += " " + ITER + " "

      ITER += 1

      // As it exceeds watermark it is written
      // as strings would never get too large in one iter. it is safe to concat them till they reach watermark
      // writing data to stream buffer is costly and it can be reduced data is first collected till it reaches
      // highWaterMark value then written once.
      // writes are reduced perf. is increased.
      if (output.length >= writableHighWaterMark) {
        writeStream.write(output)
        // since extra data wouldn't be large enough to make perf. diff. it is best to write it to buff. at once.
        // it would be stored in additional buffer and written in next write
        // clean string for next accumulation.
        output = ""
        return
      }

      if (ITER === WRITES - 1) {
        writeStream.end(output)
        return
      }
    }
  }

  writeStream.on("drain", () => {
    /*continue writing to stream*/
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
