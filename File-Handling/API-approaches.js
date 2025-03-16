const { handleError } = require("./utils")

{
  // callback
  const fs = require("node:fs")

  fs.copyFile("text.txt", "text-callback.txt", console.log)
}

{
  // promises
  const fsPromises = require("node:fs/promises")

  handleError(
    async () => await fsPromises.copyFile("text.txt", "text-promise.txt"),
    console.log
  )
}

{
  // promises
  const fsPromises = require("node:fs/promises")

  fsPromises.copyFile("text.txt", "text-promise.txt").catch(console.log)
}

{
  // synchronous
  const fs = require("node:fs")

  handleError(() => fs.copyFileSync("text.txt", "text-sync.txt"), console.log)
}

console.log("in")
