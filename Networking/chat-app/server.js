const net = require("node:net")
const { PORT, HOST } = require("./constants")

const server = net.createServer()

server.on("connection", (socket) => {
    console.log("new connection", socket.address())

    socket.on("data", chunk => {
        console.log(chunk.toString())
    })
})

server.listen(PORT, HOST, () => {
  console.log("Listening on", HOST, PORT)
})
