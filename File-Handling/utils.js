const { isAsyncFunction } = require("util/types")

module.exports.handleError = function (callback, onError = console.log) {
  const async = isAsyncFunction(callback)

  if (async) return callback().catch(onError)

  try {
    return callback()
  } catch (error) {
    onError(error)
  }
}
