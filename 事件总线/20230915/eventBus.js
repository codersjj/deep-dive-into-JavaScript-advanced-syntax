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

  off(eventName, eventCallback) {
    const handlers = this.eventHandlerMap[eventName]
    if (!handlers) return
    if (!eventCallback) {
      this.eventHandlerMap[eventName] = []
    }
    else {
      for (let i = handlers.length - 1; i >= 0; i--) {
        const handler = handlers[i]
        if (handler.eventCallback === eventCallback) {
          handlers.splice(i, 1)
        }
      }
    }
  }
}

const eventBus = new JJEventBus()

module.exports = eventBus