Function.prototype.myCall = function(thisArg, ...args) {
  const fn = this

  const _thisArg = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg)
  const fnKey = Symbol('fnKey')
  _thisArg[fnKey] = fn

  const res = _thisArg[fnKey](...args)

  delete _thisArg[fnKey]

  return res
}

function foo(...args) {
  console.log('foo executed, args:', args, 'this:', this)
}

// foo('hello', 'world')
// foo.call({ info: 'hi' })
foo.call({ info: 'hi' }, 'hello', 'world')

// foo.myCall({ info: 'hi' })
foo.myCall({ info: 'hi' }, 'hello', 'world')