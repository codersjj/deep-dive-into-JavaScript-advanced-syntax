# `new` 操作背后的原理以及手写函数模拟实现

## 前言

我们知道，在 `ES6` 之前（`ES5`），`JavaScript` 中类的表现形式就是构造函数。

`JavaScript` 中的构造函数是怎么样的？

- 构造函数也是一个**普通的函数**，从表现形式上看，和普通的函数没有任何区别（除了按照惯例，构造函数名称的首字母通常会大写）；
- 但如果一个**普通函数被 `new` 操作符调用**了，那么这个函数就叫做**构造函数**；

## 原理

如果一个函数被 `new` 操作符调用了，那么它会执行如下操作：

1. 在内存中创建一个新对象；
2. 将这个新对象内部的 `[[Prototype]]` 属性赋值为构造函数的 `prototype` 属性；
3. 将构造函数内部的 `this` 赋值为这个新对象（即 `this` 指向新对象）；
4. 执行构造函数内部的代码（给新对象添加属性）；
5. 如果构造函数返回了非空对象，则返回该对象；否则，返回刚创建的新对象；

## 手写函数模拟 `new`

下面，我们就根据上面的原理，尝试自己手写一个函数，模拟实现 `new` 操作符的功能。

### `v1` 基本实现

我们先用 `ES5` 的语法来进行实现：

```js
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
console.log(p1); // Person {name: 'zhj', age: 20}
p1.sayName() // zhj

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2); // Person {name: 'zhj', age: 20}
p2.sayName() // zhj
```

### `v2` 考虑参数类型

上面的基本实现能跑但还存在问题，即没有考虑传入第一个参数是否为函数类型，如果第一个参数传入的不是函数，那么在执行 `constructor.apply(obj, args)` 这行代码调用 `constructor()` 时就会报错了。所以我们需要加上判断，如果第一个参数传入的不是一个函数，就直接抛出异常：

```js
function useNewOperator() {
  var constructor = arguments[0]
+
+  if (typeof constructor !== 'function') {
+    throw new TypeError('the first argument to useNewOperator function must be a function')
+  }
+
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
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

const obj = {}
const p2 = useNewOperator(obj, 'zhj', 20) // Uncaught TypeError: the first argument to useNewOperator function must be a function
console.log(p2);
p2.sayName()
```

### `v3` `Object.prototype.__proto__` 的替代方案

前面我们在将新对象内部的 `[[Prototype]]` 属性赋值为构造函数的 `prototype` 属性时，是通过给 `obj` 上的 `__proto__` 属性赋值实现的（相当于使用了 `Object.prototype.__proto__`），虽然可以，但不推荐使用 `Object.prototype.__proto__`，更推荐使用 `Object.getPrototypeOf/Reflect.getPrototypeOf` 和 `Object.setPrototypeOf/Reflect.setPrototypeOf`（参考链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto）。所以我们做如下修改：

```js
function useNewOperator() {
  var constructor = arguments[0]

  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }

  var args = [].slice.call(arguments, 1)

  // 1. 在内存中创建一个新对象
  var obj = {}

  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
+ Object.setPrototypeOf(obj, constructor.prototype)

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
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

const p1 = new Person('zhj', 20)
console.log(p1); // Person {name: 'zhj', age: 20}
p1.sayName() // zhj

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2); // Person {name: 'zhj', age: 20}
p2.sayName() // zhj
```

或者我们还可以使用 `Object.create()` 直接指定原型来创建新对象：

```js
function useNewOperator() {
  var constructor = arguments[0]

  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }

  var args = [].slice.call(arguments, 1)

  // 1. 在内存中创建一个新对象
- var obj = {}
-
  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
+ var obj = Object.create(constructor.prototype)

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
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

const p1 = new Person('zhj', 20)
console.log(p1); // Person {name: 'zhj', age: 20}
p1.sayName() // zhj

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2); // Person {name: 'zhj', age: 20}
p2.sayName() // zhj
```

### `v4` 使用 `ES6` 语法实现

下面，我们再来使用 `ES6` 语法（剩余参数（`rest parameters`）、`const`）进行实现：

```js
function useNewOperator(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }

  // 1. 在内存中创建一个新对象
  const obj = {}

  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
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
  this.name = name
  this.age = age
}

Person.prototype.sayName = function() {
  console.log(this.name);
}

const p1 = new Person('zhj', 20)
console.log(p1); // Person {name: 'zhj', age: 20}
p1.sayName() // zhj

const p2 = useNewOperator(Person, 'zhj', 20)
console.log(p2); // Person {name: 'zhj', age: 20}
p2.sayName() // zhj
```

### `v5` 考虑 `ES6` 的 `new.target` 检测

最后，还有一个点需要考虑，就是 `ES6` 新增的 `new.target` 属性，在通过使用 `new` 操作符被调用的构造方法或函数中，`new.target` 会返回一个指向构造方法或函数的引用（参考链接：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target）。所以我们可以使用 `new.target` 来检测函数或构造方法是否是通过 `new` 操作符被调用的。那么我们还需要在自己实现的 `useNewOperator` 函数中添加相应的代码：

```js
// 手写一个函数，模拟实现 new 操作符的功能

function useNewOperator(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('the first argument to useNewOperator function must be a function')
  }

+ // 在通过使用 new 操作符被调用的构造方法或函数中，new.target 返回一个指向构造方法或函数的引用。
+ useNewOperator.target = constructor

  // 1. 在内存中创建一个新对象
  const obj = {}

  // 2. 这个新对象内部的 [[Prototype]] 指针被赋值为构造函数（constructor）的 prototype 属性
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
```

### 无注释版本

```js
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
```

以上，就是关于 `new` 操作背后的原理，以及手写函数模拟实现 `new` 操作过程的所有内容啦~如果你还有什么疑问欢迎在评论区与我互动。

如果觉得本文写得还不错的话，期待您的三连、关注 + 分享，您的支持对我非常重要~