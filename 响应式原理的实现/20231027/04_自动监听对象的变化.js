// 回答上一个问题，要实现当对象属性值改变时自动执行依赖，意味着我们要监听对象的变化，监听到变化时调用 depend.notify() 即可

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


// 接下来要解决的问题：目前我们只有一个 depend 对象，并且不管 obj 对象的哪个属性发生了变化，所有的响应式函数都会重新执行。如何实现让对象的每一个属性都对应一个 depend 对象呢？