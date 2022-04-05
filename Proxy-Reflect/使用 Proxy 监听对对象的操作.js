// 使用 Object.defineProperty() 监听对对象的操作的缺点：
// 1. 设计 Object.defineProperty() 方法的初衷是精确地添加或修改对象的属性，给对象定义属性描述符，而不是为了去监听对象属性的变化；
// 2. Object.defineProperty() 无法监听更加丰富的操作，比如新增属性、删除属性
// 所以我们要知道，存取描述符的设计初衷并不是为了去监听对对象的操作的。

// 而 Proxy 的出现就解决了 Object.defineProperty() 这个 API 的缺点，它能监听对对象的各种各样的操作。

const obj = {
  name: 'zhj',
  age: 20
}

const objProxy = new Proxy(obj, {
  // 获取值时的捕获器
  get(target, property) {
    console.log(`监听到对象的 ${property} 属性被访问了~`, target);
    return target[property]
  },
  // 设置值时的捕获器
  set(target, property, value) {
    console.log(`监听到对象的 ${property} 属性被设置值了~`, target);
    target[property] = value
  }
})

console.log(objProxy.name);
console.log(objProxy.age);

objProxy.name = 'wy'
objProxy.age = 30

console.log(obj.name);
console.log(obj.age);