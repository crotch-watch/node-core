class EventEmitter {
  map = new Map()

  on(eventName, listener) {
    const { map } = this
    map.get(eventName)?.push(listener) ?? map.set(eventName, [listener])
  }
  emit(eventName, data) {
    this.map.get(eventName)?.forEach((listener) => listener(data))
  }
}

const myEmitter = new EventEmitter()

myEmitter.on("init", () => console.log("fired"))
myEmitter.on("init", () => console.log("fired once more"))
myEmitter.on("emit", console.log)

myEmitter.emit("init")
myEmitter.emit("emit", "Hello World")
