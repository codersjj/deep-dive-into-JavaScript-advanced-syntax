// 给所有的函数添加一个 jjCall 的方法
Function.prototype.jjCall = function (thisArg) {
  // 1. 获取需要被执行的函数
  const fn = this

  // 将 thisArg 转换为对象类型（防止它是非对象类型时调用方法出现报错）
  // thisArg 为 undefined 或 null 时，设置为指向全局对象（浏览器中：window，Node 中：globalThis）
  thisArg = thisArg ? Object(thisArg) : globalThis
  // 注：Object(undefine) 和 Object(null) 的结果都是空对象

  // 2. 调用需要被执行的函数
  thisArg.fn = fn
  thisArg.fn()
  delete thisArg.fn
}
function foo() {
  // 'use strict'
  // foo 函数内部在非严格模式下，使用 call 方法调用 foo 函数时，如果 thisArg 指定为 undefined 或 null，就会自动替换为指向全局对象
  console.log('foo 函数被调用了~', this, this === globalThis);
}

function sum() {
  console.log('sum 函数被调用了~', this);
}

// JavaScript 的函数的 call 方法
foo.call()
foo.call(undefined)
foo.call(null)
foo.call({ name: 'zhj' })
foo.call(123)
sum.call('哈哈哈')

// 自己实现的函数的 call 方法
foo.jjCall()
foo.jjCall(undefined)
foo.jjCall(null)
foo.jjCall({ name: 'zhj' })
foo.jjCall(123)
sum.jjCall('哈哈哈')