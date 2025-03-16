{
  // callback
  const fs = require("node:fs")

  fs.copyFile("text.txt", "text-callback.txt", console.log)
}

{
  // promises
  const fsPromises = require("node:fs/promises");

  (async () => {
    try {
      await fsPromises.copyFile("text.txt", "text-promise.txt")
    } catch (error) {
      console.log(error)
    }
  })()
}

{
  // promises
  const fsPromises = require("node:fs/promises")

  fsPromises
    .copyFile("text.txt", "text-promise.txt")
    .then(/* perform */)
    .catch(console.log)
}

{
  // synchronous
  const fs = require("node:fs")

  try {
    fs.copyFileSync("text.txt", "text-sync.txt")
  } catch (error) {
    console.log(error)
  }
}
