Function.prototype.myBind = function(thisArg, ...args) {
  const fn = this

  const _thisArg = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg)

  const newFn = (...newArgs) => {
    const fnKey = Symbol('fnKey')
    _thisArg[fnKey] = fn
    const res = _thisArg[fnKey](...args, ...newArgs)
    delete _thisArg[fnKey]
    return res
  }

  return newFn
}

function foo(...args) {
  console.log('foo executed, args:', args, 'this:', this)
  return 'foo res'
}

// const bar = foo.bind({ info: 'hi' })
const bar = foo.bind({ info: 'hi' }, 'hahaha')
bar('hello', 'world')

const baz = foo.myBind({ info: 'hi' }, 'hahaha')
baz('hello', 'world')