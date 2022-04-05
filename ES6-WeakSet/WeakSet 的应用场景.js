// 需求：Person 类中的 running 方法只能由通过 new 操作符调用构造函数创建出来的对象调用，其它对象调用时则抛出异常

// const personSet = new Set()
const personSet = new WeakSet()

class Person {
  constructor() {
    personSet.add(this)
  }

  running() {
    if (!personSet.has(this)) {
      throw new Error('只能是通过 new 操作符调用构造函数创建出来的对象调用 running 方法')
    }
    console.log('奔跑~', this);
  }
}
let p = new Person()

p.running()
p.running.call({ name: 'zhj' })

// 不使用 Set 的原因是 Set 中存储对象引用时存的是强引用，那么当我们想通过 p = null 将 p 对象销毁时，由于 Set 中也存在对 p 对象的强引用，p 对象并不会被销毁，当然，你可以通过 Set 的 delete 方法进行手动销毁，但这样有点麻烦
// p = null
// personSet.delete(p)

// 使用 WeakSet 后，当 p = null 之后，由于 WeakSet 中存的是对象的弱引用，所以 p 就能被成功销毁了
p = null