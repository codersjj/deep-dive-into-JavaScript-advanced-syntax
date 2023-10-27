// 回答上一个问题，我们可以封装一个生成响应式对象的函数

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

function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      set(newValue) {
        value = newValue
        // 派发更新
        const depend = getDepend(obj, key)
        depend.notify()
      },
      get() {
        // 收集依赖
        const depend = getDepend(obj, key)
        depend.depend()
        return value
      }
    })
  })
  return obj
}

const obj = {
  name: 'zhj',
  age: 20
}
const info = {
  msg: 'hhh'
}

const objProxy = reactive(obj)
const infoProxy = reactive(info)

// 甚至可以直接创建一个响应式对象
const bar = reactive({ name: 'bar' })
watchFn(() => {
  console.log('reactive obj bar', bar.name)
})
bar.name = 'aaa'

function foo() {
  const newName = objProxy.name
  console.log('name:', newName)
}
watchFn(foo)
watchFn(function() {
  console.log('匿名函数被调用了~ 我也是响应式函数')
})

// watchFn(function() {
//   console.log(objProxy.age, 'age 发生变化时执行 1')
// })
// watchFn(function() {
//   console.log(objProxy.age, 'age 发生变化时执行 2')
// })

// watchFn(() => {
//   console.log('name 和 age 都有访问', objProxy.name, objProxy.age)
// })

// watchFn(() => {
//   console.log(objProxy.name, '-----------')
//   console.log(objProxy.name, '+++++++++++')
// })

watchFn(() => {
  console.log(infoProxy.msg)
})

objProxy.name = 'jack'
objProxy.name = 'alan'
objProxy.name = 'alex'

objProxy.age = 18

infoProxy.msg = '哈哈哈'