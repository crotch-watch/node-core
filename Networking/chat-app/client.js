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

const moveCursor = (dx, dy) => {
  return new Promise((resolve) => {
    process.stdout.moveCursor(dx, dy, resolve)
  })
}

const moveCursorUpBy = (dy) => {
  return moveCursor(0, -dy)
}

const clearCursor = (dir) => {
  return new Promise((resolve) => {
    process.stdout.clearLine(dir, resolve)
  })
}

const clearCurrentLine = () => {
  return clearCursor(0)
}

const ask = async (client, question = "enter a message => ") => {
  const message = await rl.question(question)
  client.write(message)
  await moveCursorUpBy(1)
  await clearCurrentLine()
}

const boundAsk = ask.bind(null, client)

client.on("connect", async () => {
  console.log("Connected")
  boundAsk()
})

client.on("data", async (chunk) => {
  const { id, message } = JSON.parse(chunk)

  let status = "message"
  if (message.includes("joined")) status = "joined"
  if (message.includes("left")) status = "left"

  console.log()
  await moveCursorUpBy(1)
  await clearCurrentLine()
  if (status === "message") console.log(`user ${id} -> ${message}`)
  else console.log(message)
  boundAsk()
})
