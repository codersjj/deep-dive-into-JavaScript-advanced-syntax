/*
  需求：根据数组元素的 id 去重
*/

const arr = [
  { id: 1, name: 'jack' },
  { id: 1, name: 'alex' }
]

// 方法一：使用 Array.prototype.reduce()，判断回调函数的 accumulator（这里我们将其设置为数组）中是否已经存在某 id 的对象，如果不存在，才进行 push
const newArr1 = arr.reduce((accumulator, curr) => {
  if (!accumulator.find(item => item.id === curr.id)) {
    accumulator.push(curr)
  }
  return accumulator
}, [])
console.log(newArr1)

// 方法二：利用对象的 key 不会重复的特性。创建一个对象，然后遍历数组，把数组元素的 id 作为 key，把数组元素作为 value，存入该对象
const map = {}
arr.forEach(item => map[item.id] = item)
const newArr2 = Array.from(Object.values(map))
console.log(newArr2)


// 补充
const obj = {
  h: 'hello',
  2: 'hahaha',
  c: 'ccc',
  0: '000',
  'a': 'aaa',
  1: 'he',
  '-1': 'abc'
}
console.log(Object.keys(obj))
for (const key in obj) {
  console.log(key)
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#:~:text=The%20traversal%20order,of%20property%20creation.