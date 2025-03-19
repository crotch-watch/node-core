const fsPromises = require("node:fs/promises")

const {
  handleCreation,
  handleDeletion,
  handleRename,
  handleWrite,
  getInstruction
} = require("./handlers")

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

  fileHandle
    .on(CHANGE, async () => {
      const { command, filename, arg } = await getInstruction(fileHandle)

      if (command === CREATE) fileHandle.emit(CREATE, filename)
      if (command === WRITE) fileHandle.emit(WRITE, filename, arg)
      if (command === DELETE) fileHandle.emit(DELETE, filename)
      if (command === RENAME) fileHandle.emit(RENAME, filename, arg)
    })
    .on(WRITE, handleWrite)
    .on(DELETE, handleDeletion)
    .on(CREATE, handleCreation)
    .on(RENAME, handleRename)

  const watcher = watch(FILE_PATH)

  for await (const { eventType } of watcher) {
    if (eventType === "change") {
      fileHandle.emit(CHANGE)
    }
  }
}

void main()
