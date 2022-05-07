class JJEventBus {
  constructor() {
    this.eventBus = {}
  }

  // 监听事件的时候把回调函数保存起来
  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName]
    // 第一次进来时 handlers 不存在，需要初始化
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    // handlers.push(eventCallback)
    handlers.push({
      eventCallback,
      thisArg
    })
  }

  // 发射事件的时候调用之前监听事件时保存的回调函数
  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    handlers.forEach(handler => {
      handler.eventCallback.apply(handler.thisArg, payload)
    })
  }
}

const eventBus = new JJEventBus()

/* main.js */
eventBus.on("aaa", function(payload) {
  console.log('监听到 aaa 事件，哈哈哈~', this);
}, { name: 'zhj' })
// 同一个事件可能会监听多次
eventBus.on("aaa", function(payload) {
  console.log('监听到 aaa 事件，呵呵呵~', this);
}, { name: 'wy' })

/* utils.js */
eventBus.emit("aaa", 123)