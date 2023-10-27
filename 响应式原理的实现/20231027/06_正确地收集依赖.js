// 回答上一个问题，我们可以在 get 中收集依赖

let activeReactiveFn = null

class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    this.reactiveFns.push(fn)
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
    if (activeReactiveFn) depend.addDepend(activeReactiveFn)
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


// 接下来要解决的问题：1. 目前 Proxy 中还要关心全局变量 activeReactiveFn，最好能实现不用关心
// 2. 响应式函数中如果多次使用到对象的某个属性，会被多次响应，但其实只需要进行一次响应即可