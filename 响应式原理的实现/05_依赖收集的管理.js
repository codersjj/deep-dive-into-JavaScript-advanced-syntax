// 封装一个依赖收集类（用来收集某个对象某个属性所有的依赖）
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(fn) {
    this.reactiveFns.push(fn)
  }

  notify() {
    this.reactiveFns.forEach(reactiveFn => {
      reactiveFn()
    })
  }
}

const obj = {
  name: 'zhj',
  age: 20
}

// 每个对象的每个属性都对应一个 Depend 类的实例对象
const objNameDepend = new Depend()
function watchFn(fn) {
  objNameDepend.addDepend(fn)
}

// 封装一个获取 depend 的函数
const targetMap = new WeakMap()
function getDepend(target, property) {
  // 根据 target 对象获取相应的 map 对象
  let map = targetMap.get(target)
  // 需要考虑到第一次获取时还没有这个 map 对象
  if (!map) {
    map = new Map()
    targetMap.set(target, map)
  }

  // 根据 property 获取相应的 depend 对象
  let depend = map.get(property)
  // 需要考虑第一次获取时还没有这个 depend 对象
  if (!depend) {
    depend = new Depend()
    map.set(property, depend)
  }

  return depend
}

// 监听对象属性的变化（vue2：Object.defineProperty()，vue3：Proxy），监听到变化时再执行相应的 notify() 方法
const objProxy = new Proxy(obj, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log('set ----------', property, value);
    Reflect.set(target, property, value, receiver)
    // 在 set() 捕获器中 notify
    // 获取目标对象相应属性对应的 depend
    const depend = getDepend(target, property)
    // TODO: 当然，当前 depend 对象的 reactiveFns 中还什么都没有
    console.log(depend.reactiveFns);
    depend.notify()
  }
})

watchFn(function() {
  const newName = objProxy.name
  console.log('哈哈哈', objProxy.name);
})
watchFn(function() {
  console.log('baz 函数被调用了~');
})

function bar() {
  console.log('普通的其它函数，不需要响应式');
}

watchFn(function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 1~', objProxy.age);
})
watchFn(function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 2~', objProxy.age);
})

// obj 对象 name 属性的值改变了，自动去执行相应的响应式函数
objProxy.name = 'wy'
objProxy.name = 'mzd'
objProxy.name = 'zel'

objProxy.age = 30

// 当然，我们这里并没有给 info 对象做响应式（没有 new Proxy(info, {...})），所以改变 info 对象不会执行下面传入 watchFn 中的函数
const info = {
  address: '上海市'
}

watchFn(function() {
  console.log('监听 info 对象 address 属性的变化 ~ 1', info.address);
})
watchFn(function() {
  console.log('监听 info 对象 address 属性的变化 ~ 2', info.address);
})