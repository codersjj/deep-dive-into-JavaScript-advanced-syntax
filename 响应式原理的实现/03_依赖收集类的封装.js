// 使用数组管理某个对象的某个属性对应的响应式函数不是很方便（每个对象的每个属性都要对应一个响应式函数的数组）
// 所以我们可以定义一个类来管理（类的对象比一大堆的数组要好管理）

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

watchFn(function() {
  const newName = obj.name
  console.log('哈哈哈', obj.name);
})
watchFn(function() {
  console.log('baz 函数被调用了~');
})

function bar() {
  console.log('普通的其它函数，不需要响应式');
}

// obj 对象 name 属性的值改变了，自动去执行相应的响应式函数
obj.name = 'wy'

// 遍历操作已被封装进 Depend 的实例对象的 notify 方法中，这里只需调用 notify() 方法即可
objNameDepend.notify()