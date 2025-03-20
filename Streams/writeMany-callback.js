const { open, write, close } = require("node:fs")
const { Buffer } = require("node:buffer")

// Time - 2.1s
// CPU - 50%
// Mem - 1GB
const main = function () {
  const WRITES = 1e6
  const FILENAME = "./text.txt"
  const FLAG = "w"

  open(FILENAME, FLAG, (err, fd) => {
    console.time("timer")
    for (let i = 0; i < WRITES; i++) {
      const numString = " " + i + " "
      const buffer = Buffer.from(numString, "utf8")
      write(fd, buffer, () => {})
    }
    console.timeEnd("timer")

    close(fd)
  })
}

main()
