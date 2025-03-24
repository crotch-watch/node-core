const { Writable } = require("node:stream")
const { open, write } = require("node:fs")

class myWritable extends Writable {
  flag = "r"
  fd = null
  chunks = []
  chunkSize = 0

  constructor({ highWaterMark, filename }) {
    super({ highWaterMark })

    this.filename = filename
  }

  // runs after constructor for init. all methods are delayed till it's executed
  _construct(callback) {
    open(this.filename, this.flag, (err, fd) => {
      // passing err as arg signals we've error and node handles that
      if (err) return callback(err)

      this.fd = fd
      // no arg signals it was successful
      // invoking callback is necessary to proceed else no further exec.
      callback()
    })
  }

  _write(chunk, encoding, callback) {
    // we need to check whether chunk is larger than highWaterMark and write
    this.chunks.push(chunk)
    this.chunkSize += chunk.length

    // All calls to writable.write() that occur between the time writable._write() is called and the callback is called
    // will cause the written data to be buffered. When the callback is invoked, the stream might emit a 'drain' event.

    // if the callback signals drain means before calling it w/o arg we've to make sure we're writing it before back-pressuring
    // starts otherwise we'll just keep buffering data
    if (this.chunkSize < this.writableHighWaterMark) return callback()

    write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err)

      this.chunkSize = 0
      this.chunks = []
    })
  }
}

const stream = new myWritable({
  highWaterMark: 16 * 1024,
  filename: "./dest.txt",
})

stream.write("Hello World!")
