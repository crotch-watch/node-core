const { open } = require("node:fs/promises")

const main = async function () {
  const readable = "./src.txt"
  const readFlag = "r"
  const writable = "./dest.txt"
  const writeFlag = "w"

const read1 = await  open(readable, "w")
  const read2 = await  open(writable, "w")

await  read1.write("")
  await read2.write("")

  //
  // const WATERMARK = 64 * 1024 // bytes
  //
  // const readHandler = await open(readable, readFlag)
  // const writeHandler = await open(writable, writeFlag)
  //
  // const readStream = readHandler.createReadStream({ highWaterMark: WATERMARK })
  // const writeStream = writeHandler.createWriteStream()
  //
  // let split = ""
  // readStream.on("data", (chunk) => {
  //   // split number issue
  //   // since chunk disregards whether last el. is a complete num or not
  //   // we manually have to check for it and join the splits.
  //   const numbers = chunk.toString().split("  ")
  //   // since numbers are successive check this for adjacent nums.
  //   // check first el split
  //   const first = +numbers[0]
  //   const second = +numbers[1]
  //
  //   if (first + 1 !== second) numbers[0] = split + first
  //   split = ""
  //
  //   // check last el split
  //   const secondLast = +numbers[numbers.length - 2]
  //   const last = +numbers[numbers.length - 1]
  //
  //   // if present save it for next chunk concat
  //   if (last !== secondLast + 1) split = numbers.pop()
  //
  //   const evenNumbers = numbers.filter((numStr) => +numStr % 2 === 0)
  //   const evenNumbersString = evenNumbers.join("  ")
  //
  //   const continueWrite = writeStream.write(evenNumbersString)
  //   if (!continueWrite) readStream.pause()
  // })
  //
  // writeStream.on("drain", () => {
  //   readStream.resume()
  // })
}

void main()
