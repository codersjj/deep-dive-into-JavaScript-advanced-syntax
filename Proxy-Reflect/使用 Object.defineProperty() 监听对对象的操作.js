const obj = {
  name: 'zhj',
  age: 20
}

Object.keys(obj).forEach(key => {
  let value = obj[key]

  Object.defineProperty(obj, key, {
    get() {
      console.log(`监听到 obj 对象的 ${key} 属性被访问了~`);
      return value
    },
    set(newValue) {
      console.log(`监听到 obj 对象的 ${key} 属性被设置值了~`);
      value = newValue
    }
  })
})

console.log(obj.name);
obj.name = 'wy'
console.log(obj.name);

console.log(obj.age);
obj.age = 22
console.log(obj.age);