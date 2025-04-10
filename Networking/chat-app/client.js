import net from "node:net"
import readline from "node:readline/promises"

import { HOST, PORT } from "./constants.js"

const client = net.createConnection({
  host: HOST,
  port: PORT
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

client.on("connect", async () => {
  console.log("Connected")
  const message = await rl.question("enter a message > ")
  client.write(message)
})

client.on("data", async (chunk) => {
  console.log(chunk.toString())
  const message = await rl.question("enter a message > ")
  client.write(message)
})
