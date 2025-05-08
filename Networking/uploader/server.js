const fs = require("node:fs/promises")
const net = require("node:net")

const fill_resource = async () => {
  const file_handle = await fs.open("./text.txt", "a")

  const write_stream = file_handle.createWriteStream()

  const ITER = 1e5
  const { writableHighWaterMark } = write_stream
  let accumulator = ""
  let current_index = 0

  const loop = (start) => {
    for (let i = start; i < ITER; i++) {
      if (accumulator.length > writableHighWaterMark) {
        write_stream.write(accumulator)
        accumulator = ""
        break
      }

      accumulator += i

      if (i === ITER - 1) {
        write_stream.write(accumulator)
        write_stream.end()
      }
    }
  }

  loop(current_index)

  write_stream.on("drain", () => {
    loop(current_index)
  })

  write_stream.on("end", () => {
    console.log("write-stream has written all data")

    file_handle.close()
  })
}

const main = async () => {
  await fill_resource()
}

void main()
