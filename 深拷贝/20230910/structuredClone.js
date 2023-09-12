const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'zhj',
  friend: {
    name: 'alan'
  },

  sex: undefined,
  /*
    structuredClone() 同样无法克隆不可序列化的值，比如 Function、Symbol，如果遇到了，会抛异常
  */
  // sayHello: function() {
  //   console.log('Hello')
  // },
  // [s1]: 'hello',
  // info: s2,

  // arr: [1, undefined, () => {}, Symbol(), '2']
  arr: [1, undefined, '2']
}

// 相比于 JSON.stringify()，structuredClone() 则支持循环引用的克隆，它的劣势可能只是兼容性没有 JSON.stringify() 好
obj.myself = obj

const obj2 = structuredClone(obj)
console.log('obj2:', obj2)
console.log(obj === obj2) // false
obj2.friend.name = 'jack'
console.log(obj.friend.name) // alan