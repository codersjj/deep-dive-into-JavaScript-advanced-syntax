// 给所有的函数添加一个 jjCall 的方法
Function.prototype.jjCall = function (thisArg) {
  // 在 jjCall 中要执行调用 jjCall 的那个函数（foo）
  // 问题：如何获取到调用了 jjCall 方法的那个函数？
  // 借助于 this 的隐式绑定规则，这里的 this 就是调用了 jjCall 方法的那个函数
  // 1. 获取需要被执行的函数
  const fn = this
  // 2. 调用需要被执行的函数
  // 把需要被执行的函数添加到 thisArg 对象上
  thisArg.fn = fn
  // 通过 thisArg 对象调用需要被执行的函数（相当于 fn 在被调用时，里面的 this 被隐式绑定到了 thisArg 对象上）
  thisArg.fn()
  console.log("🚀 ~ file: call 函数的实现.js ~ line 13 ~ thisArg", thisArg)
  // 调用完后删除之前添加的属性
  delete thisArg.fn
  console.log("🚀 ~ file: call 函数的实现.js ~ line 16 ~ thisArg", thisArg)
}

function foo() {
  console.log('foo 函数被调用了~', this);
}

function sum() {
  console.log('sum 函数被调用了~', this);
}

// JavaScript 的函数的 call 方法
foo.call({ name: 'zhj' })
sum.call({ name: 'zhj' })

// 自己实现的函数的 call 方法
// 现在，foo、sum 中的 this 就被绑定到了我们传入的对象上（{ name: 'zhj' }）
foo.jjCall({ name: 'zhj' })
sum.jjCall({ name: 'zhj' })