const { eventBus } = require('./eventBus')

eventBus.on('sayHello', function(payload) {
  console.log('sayHello, payload', payload, this.name)
}, { name: 'zhj' })