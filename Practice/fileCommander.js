const fs = require("node:fs/promises")

const commandFile = './command.txt'

const CREATE = "create"
const UPDATE = "update"
const DELETE = "delete"
const RENAME = "rename"

const APPEND_FLAG = "a"

const main = async function () {
    try {
        const readHandle = await fs.open(commandFile)
        const {size: fileSizeBytes} = await readHandle.stat()

        const {
            buffer: {buffer: instructionBuffer},
        } = await readHandle.read(Buffer.alloc(fileSizeBytes), 0, fileSizeBytes, 0)

        const instructionString = Buffer.from(instructionBuffer).toString("utf8")

        const [instruction, filename, ...rest] = instructionString.split(' ')

        readHandle.on(CREATE, async () => {
            const appendHandle = await fs.open(filename, APPEND_FLAG)
            console.log(filename, " created")
            await appendHandle.close()
        })
        if (instruction === CREATE) return readHandle.emit(CREATE)

        readHandle.on(UPDATE, async () => {
            const appendHandle = await fs.open(filename, APPEND_FLAG)
            await appendHandle.appendFile(rest.join(" "))
            console.log(filename, " updated")
            await appendHandle.close()
        })
        if (instruction === UPDATE) return readHandle.emit(UPDATE)

        readHandle.on(DELETE, async () => {
            await fs.unlink(filename)
            console.log(filename, " deleted")
        })
        if (instruction === DELETE) return readHandle.emit(DELETE)

        readHandle.on(RENAME, async () => {
            const oldFileName = filename
            await fs.rename(oldFileName, rest.join(" "))
            console.log(oldFileName, " renamed to ", rest.join(" "))
        })
        if (instruction === RENAME) return readHandle.emit(RENAME)

        await readHandle.close()
    } catch (error) {
        console.error("ERROR =>", error)
    }
}

void main()