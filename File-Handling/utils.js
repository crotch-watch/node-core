const { isAsyncFunction } = require("util/types")

module.exports.handleError = function (callback, onError) {
  const async = isAsyncFunction(callback)

  if (async) return callback().catch(onError)

  try {
    callback()
  } catch (error) {
    onError(error)
  }
}
