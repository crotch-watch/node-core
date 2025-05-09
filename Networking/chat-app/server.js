const net = require("node:net")
const { PORT, HOST } = require("./constants")

const server = net.createServer()

const connections = []

server.on("connection", (socket) => {
  console.log("new connection")

  // assign id to user based on se  sequence of joining
  const id = connections.length + 1
  const user = { id, socket }

  connections.forEach((user) =>
    user.socket.write(
      JSON.stringify({ id, message: `user with id-${id} has joined.` })
    )
  )

  // collect socket to ref. later
  connections.push(user)

  socket.on("data", (chunk) => {
    // writing on all sockets in collection
    connections.forEach((user) =>
      user.socket.write(JSON.stringify({ id, message: chunk.toString() }))
    )
  })

  socket.on("error", () => {
    connections.forEach((user) =>
      user.socket.write(
        JSON.stringify({ id, message: `user-${id} has left the chat.` })
      )
    )
  })
})

server.listen(PORT, HOST, () => {
  console.log("Listening on", HOST, PORT)
})
