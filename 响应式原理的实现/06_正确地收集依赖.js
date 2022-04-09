// 保存当前需要收集的响应式函数
let activeReactiveFn = null

// 封装一个依赖收集类（用来收集某个对象某个属性所有的依赖）
class Depend {
  constructor() {
    this.reactiveFns = []
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.push(activeReactiveFn)
    }
  }

  notify() {
    this.reactiveFns.forEach(reactiveFn => {
      reactiveFn()
    })
  }
}

function watchFn(fn) {
  activeReactiveFn = fn
  fn()
  activeReactiveFn = null
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

const obj = {
  name: 'zhj',
  age: 20
}

// 监听对象属性的变化（vue2：Object.defineProperty()，vue3：Proxy），监听到变化时再执行相应的 notify() 方法
const objProxy = new Proxy(obj, {
  get(target, property, receiver) {
    // 在 get() 捕获器中收集依赖
    // 根据目标对象和目标属性获取对应的 depend
    const depend = getDepend(target, property)
    // 往对应的 depend 对象中添加对应的响应函数
    depend.depend()

    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log('set ----------', property, value);
    Reflect.set(target, property, value, receiver)
    // 在 set() 捕获器中 notify
    // 获取目标对象相应属性对应的 depend
    const depend = getDepend(target, property)
    depend.notify()
  }
})

watchFn(function() {
  console.log('-------- obj name 第一个函数 开始 --------');
  const newName = objProxy.name
  console.log('哈哈哈', objProxy.name);
  console.log('-------- obj name 第一个函数 结束 --------');
})
watchFn(function() {
  console.log(objProxy.name, 'baz 函数被调用了~');
})

watchFn(function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 1~', objProxy.age);
})
watchFn(function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 2~', objProxy.age);
})

watchFn(() => {
  console.log(objProxy.name, '新函数');
  console.log(objProxy.age, '新函数');
})

// obj 对象属性的值改变了，自动去执行相应的响应式函数
console.log('改变 obj 对象属性的值 =======================');
objProxy.name = 'wy'
// objProxy.name = 'mzd'
// objProxy.name = 'zel'

objProxy.age = 30
