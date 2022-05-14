// 手写一个函数，模拟实现 new 操作符的功能

function useNewOperator() {
  var constructor = arguments[0]
  var args = [].slice.call(arguments, 1)

  // 1. 在内存中创建一个新对象
  var obj = {}

  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
  obj.__proto__ = constructor.prototype

  // 3. 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）
  // 4. 执行构造函数内部的代码（给新对象添加属性）
  var res = constructor.apply(obj, args)

  // 5. 如果构造函数返回非空对象，则返回该对象；否则，返回刚才创建的新对象
  if (res != null && (typeof res === 'object' || typeof res === 'function')) {
    return res
  }
  return obj
}

// 测试
function Person(name, age) {
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
console.log(p1);
p1.sayName()

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2);
p2.sayName()