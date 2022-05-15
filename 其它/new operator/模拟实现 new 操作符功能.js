// 手写一个函数，模拟实现 new 操作符的功能

function useNewOperator(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }

  // 在通过使用 new 操作符被调用的构造方法或函数中，new.target 返回一个指向构造方法或函数的引用。（参考链接：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target）
  useNewOperator.target = constructor

  // 1. 在内存中创建一个新对象
  const obj = {}

  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
  // 不推荐使用 Object.prototype.__proto__，更推荐使用 Object.getPrototypeOf/Reflect.getPrototypeOf 和Object.setPrototypeOf/Reflect.setPrototypeOf（参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto）
  Object.setPrototypeOf(obj, constructor.prototype)
  // 或者使用 Object.create() 直接指定原型创建新对象
  // const obj = Object.create(constructor.prototype)

  // 3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
  // 4. 执行构造函数内部的代码（给新对象添加属性）
  const res = constructor.apply(obj, args)

  // 5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚才创建的新对象
  if (res != null && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// 测试
function Person(name, age) {
  console.log('this:', this);
  console.log('new.target:', new.target);
  console.log('useNewOperator.target:', useNewOperator.target);
  this.name = name
  this.age = age

  // return undefined
  // return null
  // return {}
  // return 123
  // return ''
  // return String(123)
  // return new String(123)
  // return { name: 'wy' }
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

const p1 = new Person('zhj', 20)
// const p1 = Person('zhj', 20)
console.log(p1);
p1.sayName()

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2);
p2.sayName()