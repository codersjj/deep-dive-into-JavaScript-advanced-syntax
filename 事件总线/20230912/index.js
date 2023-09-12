class EventBus {
  constructor() {
    /*
      this.eventHandlerMap = {
        eventName1: [
          { eventName1Callback1, thisArg },
          { eventName1Callback2, thisArg },
          ...
        ],
        eventName2: [
          { eventName2Callback1, thisArg },
          { eventName2Callback2, thisArg },
          ...
        ],
        ...
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
    for (let i = handlers.length - 1; i >= 0; i--) {
      const handler = handlers[i]
      if (handler.eventCallback === eventCallback) {
        handlers.splice(i, 1)
      }
    }
  }
}

const eventBus = new EventBus()

// a.js
const aaaHandler = function(payload) {
  console.log('监听到 aaa 事件~', payload)
}
eventBus.on('aaa', aaaHandler)
eventBus.on('aaa', function(payload) {
  console.log('监听到 aaa 事件~', payload, this)
}, { name: 'zhj' })

// b.js
eventBus.emit('aaa', 123)
// eventBus.off('aaa')
eventBus.off('aaa', aaaHandler)
console.log('---------- after off ----------')
eventBus.emit('aaa', 123)

// setInterval(() => {
//   console.log('setInterval callback')
//   eventBus.emit('aaa', 123)
// }, 1000)
// setTimeout(() => {
//   eventBus.off('aaa')
// }, 3000);