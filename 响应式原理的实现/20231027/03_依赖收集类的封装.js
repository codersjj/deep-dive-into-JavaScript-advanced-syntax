// 回答上一个问题，我们可以实现一个 Depend 类，用来收集某个属性对应的所有依赖（响应式函数），这样每个属性都对应一个 new Depend() 对象

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

function foo() {
  const newName = obj.name
  console.log('name:', newName)
}
watchFn(foo)
watchFn(function() {
  console.log('匿名函数被调用了~ 我也是响应式函数')
})

obj.name = 'jack'
depend.notify()

obj.name = 'alan'
depend.notify()

obj.name = 'alex'
depend.notify()


// 接下来要解决的问题：可以看到，每次修改了属性值，我们都要手动调用 notify()，很麻烦。如何做到对象的属性值被修改之后，自动（不用手动执行 depend.notify()）去执行相应的响应式函数？