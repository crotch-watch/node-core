const net = require("node:net")
const fs = require("node:fs/promises")

const socket = net.createConnection({ host: "::1", port: 1024 }, async () => {
  const file_handle = await fs.open("./storage/source.txt", "r")
  const read_stream = file_handle.createReadStream()

  read_stream.on("data", (chunk) => {
    if (!socket.write(chunk)) read_stream.pause()
  })

  socket.on("drain", () => read_stream.resume())

  read_stream.on("end", async () => {
    await file_handle.close()
    socket.end()
  })
})
