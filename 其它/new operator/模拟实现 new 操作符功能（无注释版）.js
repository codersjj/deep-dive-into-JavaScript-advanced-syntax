// 手写一个函数，模拟实现 new 操作符的功能

function useNewOperator(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }
  useNewOperator.target = constructor

  const obj = {}
  Object.setPrototypeOf(obj, constructor.prototype)
  // const obj = Object.create(constructor.prototype)
  const res = constructor.apply(obj, args)
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