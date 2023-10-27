// 回答上一个问题，我们可以重构 Depend 类，添加 depend 方法，以及改用 Set 而不是数组

let activeReactiveFn = null

class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  depend() {
    if (activeReactiveFn) this.reactiveFns.add(activeReactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(reactiveFn => reactiveFn())
  }
}

const targetMap = new WeakMap()
function getDepend(target, property) {
  let map = targetMap.get(target)
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }
  let depend = map.get(property)
  if (!depend) {
    depend = new Depend()
    map.set(property, depend)
  }
  return depend
}

function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
}

const obj = {
  name: 'zhj',
  age: 20
}

const objProxy = new Proxy(obj, {
  set(target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver)
    // 获取相应的 depend
    const depend = getDepend(target, key)
    // console.log(depend.reactiveFns)
    // 派发更新（监听到变化，调用 depend.notify()）
    depend.notify()
  },
  get(target, key, receiver) {
    // 获取相应的 depend
    const depend = getDepend(target, key)
    // get 时收集依赖
    depend.depend()
    return Reflect.get(target, key, receiver)
  }
})

function foo() {
  const newName = objProxy.name
  console.log('name:', newName)
}
watchFn(foo)
watchFn(function() {
  console.log('匿名函数被调用了~ 我也是响应式函数')
})

watchFn(function() {
  console.log(objProxy.age, 'age 发生变化时执行 1')
})
watchFn(function() {
  console.log(objProxy.age, 'age 发生变化时执行 2')
})

watchFn(() => {
  console.log('name 和 age 都有访问', objProxy.name, objProxy.age)
})

watchFn(() => {
  console.log(objProxy.name, '-----------')
  console.log(objProxy.name, '+++++++++++')
})

objProxy.name = 'jack'
objProxy.name = 'alan'
objProxy.name = 'alex'

objProxy.age = 18


// 接下来要解决的问题：如果有其它对象，根据目前的操作，还得重新手动地 new Proxy()，如何实现自动？