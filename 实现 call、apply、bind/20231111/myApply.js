function foo(...args) {
  console.log('foo executed, args:', args, 'this:', this);
  return 'foo res'
}

Function.prototype.myApply = function(thisArg, args) {
  const fn = this

  const _thisArg = thisArg === null || thisArg === undefined
    ? globalThis
    : Object(thisArg)
  const fnKey = Symbol('fnKey')
  _thisArg[fnKey] = fn

  // this 的隐式绑定
  const res = args ? _thisArg[fnKey](...args) : _thisArg[fnKey]()

  delete _thisArg[fnKey]

  return res
}

// foo('hello', 'world')
const res1 = foo.apply({ info: 'hi' }, ['hello', 'world'])
console.log(res1)

const res2 = foo.myApply({ info: 'hi' }, ['hello', 'world'])
console.log(res2)