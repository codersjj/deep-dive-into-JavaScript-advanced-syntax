const obj = {
  name: 'zhj'
}

let value = obj.name

Object.defineProperty(obj, 'name', {
  get() {
    console.log('监听到 obj 对象的 name 属性被访问了~');
    return value
  },
  set(newValue) {
    console.log('监听到 obj 对象的 name 属性被设置值了~');
    value = newValue
  }
})

console.log(obj.name);
obj.name = 'wy'
console.log(obj.name);