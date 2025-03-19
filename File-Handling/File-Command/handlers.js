const fsPromises = require("node:fs/promises")
const { Buffer } = require("node:buffer")

const { handleError } = require("../utils")

module.exports.getInstruction = async (fileHandle) => {
  return handleError(async () => {
    const { size: instructionLength } = await fileHandle.stat()
    const FROM_START = 0

    const { buffer: content } = await fileHandle.read({
      buffer: Buffer.allocUnsafe(instructionLength),
      position: FROM_START,
      length: instructionLength
    })

    const instruction = content.toString()
    const [command, filename, ...rest] = instruction.split(" ")

    return { command, filename, arg: rest.join(" ") }
  })
}

module.exports.handleCreation = async function (filename) {
  handleError(async () => {
    const { open } = fsPromises

    const createdFileHandle = await open(filename, "w")
    await createdFileHandle.close()

    console.log(filename, " created")
  })
}

module.exports.handleDeletion = async function (filename) {
  handleError(async () => {
    const { unlink } = fsPromises

    handleError(async () => {
      await unlink(filename)

      console.log(filename, " deleted")
    })
  })
}

module.exports.handleWrite = async function (filename, content) {
  handleError(async () => {
    const { open } = fsPromises

    const writeFileHandle = await open(filename, "a")
    await writeFileHandle.write(content)
    await writeFileHandle.close()

    console.log(content, " written on ", filename)
  })
}

module.exports.handleRename = async function (filename, newFileName) {
  handleError(async () => {
    const { rename } = fsPromises

    await rename(filename, newFileName)

    console.log(filename, " renamed")
  })
}

