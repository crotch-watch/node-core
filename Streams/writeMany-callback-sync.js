const { open, writeSync, close } = require("node:fs")
const { Buffer } = require("node:buffer")

// Time - 3s
// CPU - 15%
// Mem - 25MB
const main = function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  open(FILENAME, FLAG, (err, fd) => {
    console.time("timer")
    for (let i = 0; i < WRITES; i++) {
      const numString = " " + i + " "
      const buffer = Buffer.from(numString, "utf8")
      writeSync(fd, buffer)
    }
    console.timeEnd("timer")

    close(fd)
  })
}

main()
