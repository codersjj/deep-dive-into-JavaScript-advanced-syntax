// 封装一个响应式的函数
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

const obj = {
  name: 'zhj',
  age: 20
}

// 用函数封装要自动执行的这段代码
function foo() {
  const newName = obj.name
  console.log('哈哈哈', obj.name);
}

function baz() {
  console.log('baz 函数被调用了~');
}

function bar() {
  console.log('普通的其它函数，不需要响应式');
}

// 调用 watchFn 函数，将目标函数变成响应式函数
watchFn(foo)
watchFn(baz)

// obj 对象 name 属性的值改变了，自动去执行 foo 函数
obj.name = 'wy'

// 单独调用函数
// foo()
// 遍历相应的响应式函数数组，挨个调用函数
reactiveFns.forEach(reactiveFn => {
  reactiveFn()
})