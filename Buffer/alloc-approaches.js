const { Buffer } = require("node:buffer")

Buffer.alloc(10)

Buffer.allocUnsafe(10) ||
  Buffer.from(/* allocUnsafe */) ||
  Buffer.concat(/* allocUnsafe*/)

{
  const pool = (Buffer.poolSize >>> 1) - 1 // allocations under 4 KiB are sliced from a single pre-allocated Buffer
  const buffer = Buffer.allocUnsafe(pool)

  let unsanitized = 0
  buffer.forEach((el) => {
    if (el !== 0x00) unsanitized++ && console.log(el)
  })
  console.log("unsanitized elements : ", unsanitized)
}

{
  const buffer = Buffer.allocUnsafeSlow(4e9)

  let unsanitized = 0
  buffer.forEach((el) => {
    if (el !== 0x00) unsanitized++ && console.log(el)
  })
  console.log("unsanitized elements : ", unsanitized)
}
