// 回答上一个问题，要实现让每个对象的每一个属性都对应一个 depend 对象，需要设计一个合适的数据结构，我们可以采用如下数据结构：一个 Map 对象，用来保存某个对象中每个属性到 depend 对象的映射；一个 WeakMap 对象，用来保存各个对象到 Map 对象的映射

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

const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
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
    console.log(depend.reactiveFns)
    // 派发更新（监听到变化，调用 depend.notify()）
    depend.notify()
  },
  get(target, key, receiver) {
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

objProxy.name = 'jack'
objProxy.name = 'alan'
objProxy.name = 'alex'

objProxy.age = 18


// 接下来要解决的问题：管理依赖的数据结构有了，下面如何收集依赖呢？