const net = require("node:net")
const { PORT, HOST } = require("./constants")

const server = net.createServer()

const connections = []

server.on("connection", (socket) => {
  console.log("new connection", socket.address())

  // collect socket to ref. later
  connections.push(socket)

  socket.on("data", (chunk) => {
    // writing on all sockets in collection
    connections.forEach((connection) => connection.write(chunk))
  })
})

server.listen(PORT, HOST, () => {
  console.log("Listening on", HOST, PORT)
})
