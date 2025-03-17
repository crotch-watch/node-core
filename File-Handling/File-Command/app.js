const fsPromises = require("node:fs/promises")
const { Buffer } = require("node:buffer")

const READ = "read"
const WRITE = "write"
const DELETE = "delete"
const CREATE = "create"
const CHANGE = "CHANGE"

const FILE_PATH =
  "/home/dev/Workspace/node-core/File-Handling/File-Command/command.txt"

const main = async function () {
  const { open, watch } = fsPromises

  const fileHandle = await open(FILE_PATH)

  fileHandle.on(CHANGE, async () => {
    const { size: instructionLength } = await fileHandle.stat()
    const FROM_START = 0

    const { buffer: content } = await fileHandle.read({
      buffer: Buffer.allocUnsafe(instructionLength),
      position: FROM_START,
      length: instructionLength
    })

    const instruction = content.toString().trim()
    const START = 0 // beginning of string

    const indexAfterCmd = instruction.indexOf(" ", START)
    const command = string.slice(START, indexAfterCmd)

    if (command === WRITE) {
      console.log("command - write")
    }
  })

  const watcher = watch(FILE_PATH)

  for await (const { eventType } of watcher) {
    if (eventType === "change") {
    }
  }
}

void main()
