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

  // 取消监听时移除事件对应的回调对应的对象
  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName]
    if (!handlers) return
    const newHandlers = [...handlers]
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i]
      if (handler.eventCallback === eventCallback) {
        // 从原来的数组中拿对应 handler 的 index
        const index = handlers.indexOf(handler)
        handlers.splice(index, 1)
      }
    }
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
const aaaHandler1 = function(payload) {
  console.log('监听到 aaa 事件，呵呵呵~', this);
}
// 同一个事件同一个回调也可能会出现多次
eventBus.on("aaa", aaaHandler1, { name: 'wy' })
eventBus.on("aaa", aaaHandler1, { name: 'lb' })

/* utils.js */
eventBus.emit("aaa", 123)
console.log('---------------------------------------------');
// 移除监听（取消监听到 aaa 事件时 aaaHandler1 回调函数的执行）
eventBus.off('aaa', aaaHandler1)
// 移除监听后再次发射事件，被移除的回调函数不会再执行
eventBus.emit("aaa", 123)