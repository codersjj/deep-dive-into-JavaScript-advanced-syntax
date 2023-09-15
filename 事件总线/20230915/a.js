const eventBus = require("./eventBus")

eventBus.on('aaa', function(payload) {
  console.log('1 aaa 事件被触发了~', payload, this)
}, { name: 'zhj' })
eventBus.on('aaa', function(payload) {
  console.log('2 aaa 事件被触发了~', payload, this)
}, { name: 'alan' })