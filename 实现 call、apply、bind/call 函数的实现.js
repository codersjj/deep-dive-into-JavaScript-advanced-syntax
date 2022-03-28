// 给所有的函数添加一个 jjCall 的方法
Function.prototype.jjCall = function (thisArg) {
  // 1. 获取需要被执行的函数
  const fn = this

  // 将 thisArg 转换为对象类型（防止它是非对象类型时调用方法出现报错）
  thisArg = Object(thisArg)

  // 2. 调用需要被执行的函数
  thisArg.fn = fn
  thisArg.fn()
  delete thisArg.fn
}

function foo() {
  console.log('foo 函数被调用了~', this);
}

function sum() {
  console.log('sum 函数被调用了~', this);
}

// JavaScript 的函数的 call 方法
foo.call({ name: 'zhj' })
foo.call(123)
sum.call('哈哈哈')

// 自己实现的函数的 call 方法
foo.jjCall({ name: 'zhj' })
foo.jjCall(123)
sum.jjCall('哈哈哈')