const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'zhj',
  friend: {
    name: 'alan'
  },

  /*
    undefined、Function、Symbol 是无效的 JSON 值，
    JSON.stringify() 时，它们如果是在对象中，会被忽略；如果是在数组中，会被转换为 null
  */
  sex: undefined,
  sayHello: function() {
    console.log('Hello')
  },
  [s1]: 'hello',
  info: s2,

  arr: [1, undefined, () => {}, Symbol(), '2']
}

// 存在循环引用时，JSON.stringify() 序列化时会报错
obj.myself = obj

const obj2 = JSON.parse(JSON.stringify(obj))
console.log('obj2:', obj2)
console.log(obj === obj2) // false
obj2.friend.name = 'jack'
console.log(obj.friend.name) // alan