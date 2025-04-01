const net = require("node:net")

const HOST = "127.0.0.1"
const PORT = 3000

const socket = net.createConnection({ host: HOST, port: PORT })
socket.write("Hello World")
