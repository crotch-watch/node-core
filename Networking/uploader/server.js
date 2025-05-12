const fs = require("node:fs/promises")
const net = require("node:net")

const server = net.createServer()

server.on("connection", async (socket) => {
  const file_handle = await fs.open("./storage/dest.txt", "w")
  const write_stream = file_handle.createWriteStream()

  socket.on("data", (chunk) => {
    if (!write_stream.write(chunk)) {
      socket.pause()
    }
  })

  write_stream.on("drain", () => {
    socket.resume()
  })
})

server.listen(1024, "::1", () => {
  console.log("server listening@", server.address())
})
