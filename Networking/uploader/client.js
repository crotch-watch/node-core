const net = require("node:net")
const fs = require("node:fs/promises")
const path = require("node:path")
const readline = require("node:readline/promises")

const moveCursor = (dx, dy) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(dx, dy)
    resolve()
  })
}

const moveCursorUpBy1 = () => {
  return moveCursor(0, -1)
}

const clearCursor = (dir) => {
  return new Promise((resolve) => {
    process.stdout.clearLine(dir)
    resolve()
  })
}

const socket = net.createConnection({ host: "::1", port: 1024 }, async () => {
  const file_handle = await fs.open("./storage/source.txt", "r")
  const read_stream = file_handle.createReadStream()
  const { size: file_size_bytes } = await file_handle.stat()

  let percentage_uploaded = 0
  let bytes_uploaded = 0

  const file_path = process.argv[2]
  const file_name = path.basename(file_path)

  socket.write(`${file_name}-|`)

  read_stream.on("data", async (chunk) => {
    bytes_uploaded += chunk.length
    percentage_uploaded = Math.floor((bytes_uploaded / file_size_bytes) * 100)

    console.log(`UPLOADED ${percentage_uploaded}%`)

    await moveCursorUpBy1()
    await clearCursor()

    if (!socket.write(chunk)) read_stream.pause()
  })

  socket.on("drain", () => read_stream.resume())

  read_stream.on("end", async () => {
    await file_handle.close()
    socket.end()
  })
})
