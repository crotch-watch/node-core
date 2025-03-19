const fsPromises = require("node:fs/promises")
const { Buffer } = require("node:buffer")

const { handleError } = require("../utils.js")

const main = async function () {
  const WRITE = "write"
  const DELETE = "delete"
  const CREATE = "create"
  const CHANGE = "change"
  const RENAME = "rename"

  const FILE_PATH =
    "D:\\Workspace\\WebstormProjects\\node-core\\File-Handling\\File-Command\\command.txt"

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

    const instruction = content.toString()
    const [command, filename, ...rest] = instruction.split(" ")

    if (command === CREATE) {
      handleError(async () => {
        const createdFileHandle = await open(filename, "w")
        await createdFileHandle.close()
      })
    }

    if (command === WRITE) {
      handleError(async () => {
        const writeFileHandle = await open(filename, "w")
        await writeFileHandle.write(rest.join(" "))
        await writeFileHandle.close()
      })
    }

    if(command === DELETE) {
      const { unlink } = fsPromises

      handleError(async () => {
        await unlink(filename)
        console.log(filename, " deleted")
      })
    }

    if(command === RENAME) {
      const { rename } = fsPromises
      handleError(async () => {
        await rename(filename, rest[0])
        console.log(filename, " renamed")
      })
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
