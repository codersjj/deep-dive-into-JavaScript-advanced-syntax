const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: 'zhj',
  friend: {
    name: 'wy'
  },
  // 函数
  foo: function() {
    console.log('foo function');
  },
  // Symbol 作为 key
  [s1]: 'aaa',
  // Symbol 作为 value
  s2: s2
}

// 循环引用（JSON.stringify() 会报错：TypeError: Converting circular structure to JSON）
obj.inner = obj

const newObj = JSON.parse(JSON.stringify(obj))

console.log(newObj) // { name: 'zhj', friend: { name: 'wy' } }
console.log(obj === newObj) // false => 不是同一个对象
obj.name = '张謇'
console.log(newObj.name) // zhj
obj.friend.name = '王毅'
console.log(newObj.friend.name) // wy

// 总结：JSON.parse() 存在如下问题：
// 1. 会忽略函数、Symbol 等内容；
// 2. 无法处理循环引用，循环引用时会报错；