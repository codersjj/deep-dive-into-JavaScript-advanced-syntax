// 保存当前需要收集的响应式函数
let activeReactiveFn = null

// 封装一个依赖收集类（用来收集某个对象某个属性所有的依赖）
class Depend {
  constructor() {
    this.reactiveFns = new Set()
  }

  depend() {
    if (activeReactiveFn) {
      this.reactiveFns.add(activeReactiveFn)
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

function watchFnLazily(sourceFn, fn) {
  activeReactiveFn = fn
  sourceFn()
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

// 封装一个将对象变成响应式对象的函数（Vue 2 的实现方式，即使用 ES6 之前的 Object.defineProperty() 方法去监听对象属性的变化）
function reactive(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
      get() {
        const depend = getDepend(obj, key)
        depend.depend()
        return value
      },
      set(newVal) {
        value = newVal
        const depend = getDepend(obj, key)
        depend.notify()
      }
    })
  })

  return obj
}

const obj = {
  name: 'zhj',
  age: 20
}

const newObj = reactive(obj)

watchFn(function() {
  console.log('-------- watchFn obj name 第一个函数 开始 --------');
  const newName = newObj.name
  console.log('哈哈哈', newObj.name);
  console.log('-------- watchFn obj name 第一个函数 结束 --------');
})

watchFnLazily(() => newObj.name, function() {
  console.log('-------- obj name 第一个函数 开始 --------');
  const newName = newObj.name
  console.log('哈哈哈', newObj.name);
  console.log('-------- obj name 第一个函数 结束 --------');
})
watchFnLazily(() => newObj.name, function() {
  console.log(newObj.name, 'baz 函数被调用了~');
})

watchFnLazily(() => newObj.age, function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 1~', newObj.age);
})
watchFnLazily(() => newObj.age, function() {
  console.log('obj 对象的 age 属性发生变化时需要执行的内容 2~', newObj.age);
})

watchFnLazily(() => {
  newObj.name
  newObj.age
}, () => {
  console.log(newObj.name, '新函数');
  console.log(newObj.age, '新函数');
})

// 只会监听 obj 的 age 的变化，obj 的 name 改变时不会重新执行下面的响应函数
watchFnLazily(() => newObj.age, () => {
  console.log(newObj.name, '新函数2');
  console.log(newObj.age, '新函数2');
})

// obj 对象属性的值改变了，自动去执行相应的响应式函数
console.log('改变 obj 对象属性的值 =======================');
newObj.name = 'wy'
// newObj.name = 'mzd'
// newObj.name = 'zel'

newObj.age = 30
newObj.name = '小王'

console.log('============================== 分界线 ==============================');

const info = {
  nation: '中国',
  address: '上海市'
}

const newInfo = reactive(info)

watchFn(() => {
  console.log(newInfo.address);
})

newInfo.address = '北京市'

console.log('============================== 分界线 ==============================');

// 创建对象时就可以将对象变成响应式对象
const foo = reactive({
  name: 'foo'
})

watchFn(() => {
  console.log(foo.name);
})

foo.name = 'bar'