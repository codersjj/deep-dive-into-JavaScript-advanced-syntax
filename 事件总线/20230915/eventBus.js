class JJEventBus {
  constructor() {
    /*
      this.eventHandlerMap = {
        eventName: [
          { eventCallback, thisArg },
          { eventCallback, thisArg }
        ]
      }
    */
    this.eventHandlerMap = {}
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventHandlerMap[eventName]
    if (!handlers) {
      handlers = []
      this.eventHandlerMap[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  emit(eventName, payload) {
    const handlers = this.eventHandlerMap[eventName]
    if (!handlers) return
    handlers.forEach(({ eventCallback, thisArg }) => {
      eventCallback.call(thisArg, payload)
    })
  }
}

const eventBus = new JJEventBus()

module.exports = eventBus