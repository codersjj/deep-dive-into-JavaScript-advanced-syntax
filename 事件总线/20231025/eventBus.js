class EventBus {
  constructor() {
    /*
      {
        eventName1: [
          {
            eventName1Cb1,
            thisArg
          },
          {
            eventName1Cb2,
            thisArg
          }
        ],
        eventName2: [
          {
            eventName2Cb1,
            thisArg
          },
          {
            eventName2Cb2,
            thisArg
          }
        ]
      }
    */
    this.eventCallbackMap = {}
  }

  on(eventName, callback, thisArg) {
    let callbacks = this.eventCallbackMap[eventName]
    if (!callbacks) {
      callbacks = []
      this.eventCallbackMap[eventName] = callbacks
    }
    // if (!callbacks.find(item => item.callback === callback)) {
      callbacks.push({ callback, thisArg })
    // }
  }

  emit(eventName, ...payload) {
    const callbacks = this.eventCallbackMap[eventName]
    if (callbacks) {
      callbacks.forEach(({ callback, thisArg }) => {
        callback.apply(thisArg, payload)
      })
    }
  }
}

const eventBus = new EventBus()

module.exports = {
  eventBus
}