const net = require("node:net")

const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"))
  })
})

const PORT = 3000
const HOSTNAME = "127.0.0.1"
server.listen(PORT, HOSTNAME, () => {
  console.log(`Listening to`, server.address())
})
