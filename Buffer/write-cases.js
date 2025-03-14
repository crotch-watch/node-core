const { Buffer } = require("node:buffer")

const buffer = Buffer.alloc(4)

buffer[0] = 0x1f
buffer[1] = 0x1a
buffer[2] = 0x54
buffer[3] = 0x2d
buffer.forEach(console.log)
console.log("\n")

buffer[-1] = 0xff
buffer[4] = 0xff
buffer.forEach(console.log)
console.log("\n")

buffer[0] = 10.5
console.log(buffer[0])
console.log("\n")

buffer[0] = -12
console.log(buffer[0])
console.log("\n")

buffer.writeInt8(-12, 0)
console.log(buffer.readInt8(0))
console.log("\n")

buffer[0] = ""
buffer[1] = []
buffer[2] = {}
buffer[3] = NaN
buffer.forEach(console.log)
console.log("\n")

buffer.write("hey!", "utf-8")
console.log(buffer.toString("utf-8"))
console.log("\n")