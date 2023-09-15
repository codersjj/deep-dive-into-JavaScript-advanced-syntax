const eventBus = require("./eventBus")

eventBus.on('aaa', function(payload) {
  console.log('1 aaa 事件被触发了~', payload, this)
}, { name: 'zhj' })
const aaaHandler = function(payload) {
  console.log('2 aaa 事件被触发了~', payload, this)
}
eventBus.on('aaa', aaaHandler, { name: 'alan' })
// eventBus.off('aaa')
eventBus.off('aaa', aaaHandler)