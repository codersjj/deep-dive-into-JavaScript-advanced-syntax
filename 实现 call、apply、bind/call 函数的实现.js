// 给所有的函数添加一个 jjCall 的方法
Function.prototype.jjCall = function () {
  // 在 jjCall 中要执行调用 jjCall 的那个函数（foo）
  // 问题：如何获取到调用了 jjCall 方法的那个函数？
  // 借助于 this 的隐式绑定规则，这里的 this 就是调用了 jjCall 方法的那个函数
  // 1. 获取需要被执行的函数
  const fn = this
  // 2. 调用需要被执行的函数
  fn()
}

function foo() {
  console.log('foo 函数被调用了~');
}

function sum() {
  console.log('sum 函数被调用了~');
}

// JavaScript 的函数的 call 方法
foo.call()
sum.call()

// 自己实现的函数的 call 方法
// 隐式绑定
foo.jjCall()
sum.jjCall()