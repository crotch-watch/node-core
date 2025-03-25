const { Readable } = require("node:stream")
const { open, read, close } = require("node:fs")

class myReadable extends Readable {
  fd = null
  FLAG = "r"

  constructor({ filename, ...options }) {
    super(options)

    this.filename = filename
  }

  _construct(callback) {
    open(this.filename, this.FLAG, (err, fd) => {
      if (err) return callback(err)

      this.fd = fd
      callback()
    })
  }

  _read(size) {
    const buffer = Buffer.allocUnsafe(size)
    read(this.fd, buffer, (errorWhileReading, bytesRead) => {
      if (errorWhileReading) return this.destroy(errorWhileReading)

      if (bytesRead === 0) {
        console.log("Underlying", this.filename, "is read")
        return this.push(null)
      }

      const filledBuffer = buffer.subarray(0, bytesRead)
      this.push(filledBuffer)
    })
  }

  _destroy(errorDestroying, destroyCallback) {
    close(this.fd, (errorClosing) => {
      if (errorClosing) return destroyCallback(errorClosing || errorDestroying)

      console.log(this.filename, "has been closed")
    })
  }
}

const stream = new myReadable({ filename: "./src.txt" })

stream.on("data", console.log)
stream.on("end", () => {
  console.log("end emitted")
  stream.destroy()
  console.log("stream destroyed")
})
