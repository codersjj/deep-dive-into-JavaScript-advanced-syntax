// 1. for...of 场景

// 2. 展开语法（spread syntax）
const iterableObj = {
  names: ['李白', '杜甫', '苏轼'],
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

const names = ['wy', 'lb', 'lxy']
const newNames = [...names, ...iterableObj]
console.log(newNames);

const obj = { name: 'zhj', age: 20 }
// 原生的 Object 对象是不可迭代的
// for (const item of obj) { // TypeError: obj is not iterable

// }
// 在对象字面量中也可以使用展开操作符把对象中的内容放进一个新的对象中，这是 ES2018 新增的特性（https://github.com/tc39/proposal-object-rest-spread）
// 这是这个新的语法来做的，而不是利用迭代器来实现的
const newObj = { ...obj }
console.log(newObj);

// 3. 解构赋值（Destructuring Assignment）
const [name1, name2] = names
console.log(name1, name2);
const [name3, name4, name5] = iterableObj
console.log(name3, name4, name5);

// 对象的解构赋值是 ES6 时新增的特性，也不是用迭代器来实现的
const { name, age } = obj
console.log(name, age);

// 4. 创建一些其它的对象
// 比如创建 Set 对象
const set1 = new Set(names)
const set2 = new Set(iterableObj)
console.log(set1);
console.log(set2);

// 比如使用 Array.from() 创建数组对象
const newArr = Array.from(iterableObj)
console.log(newArr);
// console.log(Array.from(arguments));

// 5. Promise.all()/Promise.allSettled/Promise.race()/Promise.any()
Promise.all(iterableObj).then(res => {
  console.log(res);
})