const fsPromises = require("node:fs/promises")
const { Buffer } = require("node:buffer")

const main = async function () {
  const WRITE = "write"
  const DELETE = "delete"
  const CREATE = "create"
  const CHANGE = "CHANGE"

  const FILE_PATH =
    "/home/dev/Workspace/node-core/File-Handling/File-Command/command.txt"

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

    if (instruction.includes(CREATE)) {
      const filename = instruction.substring(CREATE.length).trim()

      const createdFileHandle = await open(filename, "w")
      await createdFileHandle.close()
    }
  })

  const watcher = watch(FILE_PATH)

  for await (const { eventType } of watcher) {
    if (eventType === "change") {
      fileHandle.emit(CHANGE)
    }
  }
}

void main()
