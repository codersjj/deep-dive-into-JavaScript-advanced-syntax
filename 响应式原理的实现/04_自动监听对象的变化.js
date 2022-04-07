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

// obj 对象 name 属性的值改变了，自动去执行相应的响应式函数
objProxy.name = 'wy'
objProxy.name = 'mzd'
objProxy.name = 'zel'