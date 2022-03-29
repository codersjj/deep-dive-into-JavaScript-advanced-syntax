// 给所有的函数添加一个 jjCall 的方法
Function.prototype.jjCall = function (thisArg, ...argArray) {
  // 1. 获取需要被执行的函数
  const fn = this

  // 2. 将 thisArg 转换为对象类型（防止它是非对象类型时调用方法出现报错）
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : globalThis

  // 3. 调用需要被执行的函数
  thisArg.fn = fn
  const res = thisArg.fn(...argArray)
  delete thisArg.fn

  // 4. 将最终的结果返回出去
  return res
}
function foo() {
  console.log('foo 函数被调用了~', this, this === globalThis);
}

function sum(num1, num2) {
  console.log('sum 函数被调用了~', this, num1, num2);
  return num1 + num2
}

// JavaScript 的函数的 call 方法
foo.call()
foo.call(undefined)
foo.call(null)
foo.call({ name: 'zhj' })
foo.call(0)
foo.call('')
foo.call(123)
const callRes = sum.call('哈哈哈', 2000, 22)
console.log('调用 call 方法的结果：', callRes);

// 自己实现的函数的 call 方法
foo.jjCall()
foo.jjCall(undefined)
foo.jjCall(null)
foo.jjCall({ name: 'zhj' })
foo.jjCall(0)
foo.jjCall('')
foo.jjCall(123)
const jjCallRes = sum.jjCall('哈哈哈', 2000, 22)
console.log('调用 jjCall 方法的结果：', jjCallRes);