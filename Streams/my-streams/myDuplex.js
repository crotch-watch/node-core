const { Duplex } = require("node:stream")
const { open, close, read, write } = require("node:fs")

class myDuplex extends Duplex {
  readFlag = "r"
  writeFlag = "w"
  srcFd = null
  destFd = null
  chunks = []
  chunksSize = 0

  constructor({ source, destination, ...options }) {
    super(options)

    this.source = source
    this.destination = destination
  }

  _construct(callback) {
    open(this.source, this.readFlag, (sourceOpenError, sourceFd) => {
      if (sourceOpenError) return callback(sourceOpenError)

      this.srcFd = sourceFd

      open(this.destination, this.writeFlag, (destOpenError, destFd) => {
        if (destOpenError) return callback(destOpenError)

        this.destFd = destFd
        callback()
      })
    })
  }

  _read(size) {
    read(this.srcFd, (srcReadError, bytesRead, buffer) => {
      if (srcReadError) return this.destroy(srcReadError)

      if (bytesRead !== 0) return this.push(buffer.subarray(0, bytesRead))

      this.push(null)
    })
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk)
    this.chunksSize += chunk.length

    if (this.chunksSize > this.writableHighWaterMark) {
      write(this.destFd, Buffer.concat(this.chunks), (errorWhileWriting) => {
        if (errorWhileWriting) return callback(errorWhileWriting)

        this.chunks = []
        this.chunksSize = 0
      })
    }

    callback()
  }

  _final(callback) {
    write(this.destFd, Buffer.concat(this.chunks), (errorWhileWriting) => {
      if (errorWhileWriting) return callback(errorWhileWriting)

      this.chunks = []
      this.chunksSize = 0
    })
  }
}

const duplex = new myDuplex({ source: "./src.txt", destination: "./dest.txt" })

duplex.on("data", console.log).on("end", () => {
  console.log("destroying duplex stream")
  duplex.destroy()
})

duplex.write("Hey there!")
duplex.end(" bye!!")
