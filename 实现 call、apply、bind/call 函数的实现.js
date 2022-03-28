// 给所有的函数添加一个 jjCall 的方法
// 使用 ES6 新增的 rest parameters（剩余参数）收集其余传入的参数
Function.prototype.jjCall = function (thisArg, ...argArray) {
  // 1. 获取需要被执行的函数
  const fn = this

  // 将 thisArg 转换为对象类型（防止它是非对象类型时调用方法出现报错）
  thisArg = thisArg ? Object(thisArg) : globalThis

  // 2. 调用需要被执行的函数
  thisArg.fn = fn
  // 使用 ES6 新增的 spread arguments（展开参数）展开参数数组，挨个进行传值
  thisArg.fn(...argArray)
  delete thisArg.fn
}
function foo() {
  console.log('foo 函数被调用了~', this, this === globalThis);
}

function sum(num1, num2) {
  console.log('sum 函数被调用了~', this, num1, num2);
}

// JavaScript 的函数的 call 方法
foo.call()
foo.call(undefined)
foo.call(null)
foo.call({ name: 'zhj' })
foo.call(123)
sum.call('哈哈哈', 2000, 22)

// 自己实现的函数的 call 方法
foo.jjCall()
foo.jjCall(undefined)
foo.jjCall(null)
foo.jjCall({ name: 'zhj' })
foo.jjCall(123)
sum.jjCall('哈哈哈', 2000, 22)