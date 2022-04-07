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

// 监听对象属性的变化（vue2：Object.defineProperty()，vue3：Proxy），监听到变化时再执行相应的 notify() 方法
const objProxy = new Proxy(obj, {
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver)
  },
  set(target, property, value, receiver) {
    console.log('set ----------', property, value);
    Reflect.set(target, property, value, receiver)
    // 在 set() 捕获器中 notify
    objNameDepend.notify()
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
// 当期存在的问题 1：不管 obj 对象的哪个属性的值改变了，传入 watchFn 的函数后续都会被调用，而没有进行区分

const info = {
  address: '上海市'
}

watchFn(function() {
  console.log('监听 info 对象 address 属性的变化 ~ 1', info.address);
})
watchFn(function() {
  console.log('监听 info 对象 address 属性的变化 ~ 2', info.address);
})
// 当期存在的问题 2：真实开发中会有多个对象，它们都需要进行监听


// obj 对象
// name 属性 -> depend
// age 属性 -> depend
const objMap = new Map()
objMap.set('name', 'nameDepend')
objMap.set('age', 'ageDepend')

// info 对象
// address 属性 -> depend
const infoMap = new Map()
infoMap.set('address', 'addressDepend')

const targetMap = new WeakMap()
targetMap.set(obj, objMap)
targetMap.set(info, infoMap)

// 之后当某个对象的某个属性改变时，我们就可以根据目标对象和属性名拿到对应的 depend 了，比如获取 obj.name 的 depend：
const depend = targetMap.get(obj).get('name')
// 然后就可以通过 depend 的 notify() 方法去执行相应的响应式函数了
depend.notify()