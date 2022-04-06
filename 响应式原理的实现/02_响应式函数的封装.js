// 封装一个响应式的函数
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

const obj = {
  name: 'zhj',
  age: 20
}

// 调用 watchFn 函数，将目标函数变成响应式函数
watchFn(function() {
  const newName = obj.name
  console.log('哈哈哈', obj.name);
})
watchFn(function() {
  console.log('baz 函数被调用了~');
})

function bar() {
  console.log('普通的其它函数，不需要响应式');
}

// obj 对象 name 属性的值改变了，自动去执行相应的响应式函数
obj.name = 'wy'

// 遍历相应的响应式函数数组，挨个调用函数
reactiveFns.forEach(reactiveFn => {
  reactiveFn()
})