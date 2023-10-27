// 回答上一个问题，要重新执行一段代码，我们首先想到的是把这段代码放到一个函数中，后续调用该函数即可。
// 所以问题就变成了：当对象的属性改变了之后，怎么去自动执行相应的函数（一个或多个）呢？

// 封装一个响应式函数
const reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

const obj = {
  name: 'zhj',
  age: 20
}

function foo() {
  const newName = obj.name
  console.log('name:', newName)
}
// 调用 watchFn 函数，将目标函数变成响应式函数（即需要变成响应式函数的函数，用 watchFn 包一下）
watchFn(foo)
watchFn(function() {
  console.log('匿名函数被调用了~ 我也是响应式函数')
})

function bar() {
  console.log('普通的其它函数，不需要响应式')
}

// obj 对象的 name 属性值改变了，自动去执行相应的响应式函数
obj.name = 'jack'

// 遍历相应的响应式函数数组，挨个调用（当然，这里还是手动的，后续会讲如何实现自动）
reactiveFns.forEach(reactiveFn => reactiveFn())


// 接下来要解决的问题：数据结构。目前我们是用一个数组来保存 obj 对象 name 属性对应的响应式函数，但实际开发中，还会有 obj 对象的其它属性、其它的对象的属性，如果针对每个属性都定义一个数组，是非常不方便管理的。所以我们需要一个合适的数据结构。