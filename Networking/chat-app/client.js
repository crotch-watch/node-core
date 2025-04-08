const net = require("node:net")
const { HOST, PORT } = require("./constants")

const client = net.createConnection({
  host: HOST,
  port: PORT
})

client.on("connect", () => {
  console.log("Connected")
})
