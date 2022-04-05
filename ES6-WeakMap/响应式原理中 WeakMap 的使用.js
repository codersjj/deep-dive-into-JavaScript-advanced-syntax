// 当数据改变时，执行相应的函数以做出某些反应
// 关键：数据与函数如何关联起来

const obj1 = {
  name: 'zhj',
  age: 20
}

function obj1NameFn1() {
  console.log('obj1 的 name 发生变化啦~', '函数 obj1NameFn1 被执行');
}
function obj1NameFn2() {
  console.log('obj1 的 name 发生变化啦~', '函数 obj1NameFn2 被执行');
}
function obj1AgeFn1() {
  console.log('obj1 的 age 发生变化啦~', '函数 obj1AgeFn1 被执行');
}
function obj1AgeFn2() {
  console.log('obj1 的 age 发生变化啦~', '函数 obj1AgeFn2 被执行');
}

const obj2 = {
  name: 'wy',
  age: 30,
  height: 1.88
}

function obj2NameFn1() {
  console.log('obj2 的 name 发生变化啦~', '函数 obj2NameFn1 被执行');
}
function obj2NameFn2() {
  console.log('obj2 的 name 发生变化啦~', '函数 obj2NameFn2 被执行');
}
function obj2AgeFn1() {
  console.log('obj2 的 age 发生变化啦~', '函数 obj2AgeFn1 被执行');
}
function obj2AgeFn2() {
  console.log('obj2 的 age 发生变化啦~', '函数 obj2AgeFn2 被执行');
}


// 1. 创建一个 WeakMap，用来保存对象和相应函数之间的映射关系
// 不使用 Map 而使用 WeakMap 的原因是：如果有一天当 obj1 需要销毁时，即 obj1 = null 时，如果使用的是 Map，就意味着 Map 中存在对 obj1 所指向的对象的引用，那么 obj1 所指向的对象就不会被销毁
const weakMap = new WeakMap()

// 2. 收集依赖（保存好数据的依赖关系，数据结构：WeakMap -> Map -> Array -> Function）
// 使用 Map 而不使用 WeakMap 的原因是：WeakMap 的键只能是对象，但我们需要存原始类型的键，因此需要用 Map，因为 Map 的键允许任意类型
const obj1Map = new Map()
obj1Map.set('name', [obj1NameFn1, obj1NameFn2])
obj1Map.set('age', [obj1AgeFn1, obj1AgeFn2])
weakMap.set(obj1, obj1Map)

const obj2Map = new Map()
obj2Map.set('name', [obj2NameFn1, obj2NameFn2])
obj2Map.set('age', [obj2AgeFn1, obj2AgeFn2])
weakMap.set(obj2, obj2Map)

// 3. 当 obj1.name 改变了（通过 Object.defineProperty() 或 Proxy 监听数据的变化），执行相应的函数
obj1.name = 'coderzhj'
const targetMap = weakMap.get(obj1)
const fns = targetMap.get('name')
fns.forEach(fn => fn())

// 以上，就是响应式原理中数据结构的保存过程，也是 WeakMap 的一个应用场景
