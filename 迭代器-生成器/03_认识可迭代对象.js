// 迭代器是一个实现了迭代器协议（iterator protocol）的对象：
// { next: function() { return {...} } }

// 可迭代对象是一个实现了可迭代协议（iterable protocol）的对象，其内部必须实现 @@iterator 方法，我们可以通过 [Symbol.iterator] 属性来访问它：
// { [Symbol.iterator]: function() { return 一个迭代器 } }

// 创建一个可迭代对象
const iterableObj = {
  names: ['sy', 'wy', 'sc'],
  [Symbol.iterator]: function() {
    let i = 0
    // 返回一个迭代器（用途：比如在 for...of 时就会被使用到）
    return {
      // 注意这里使用箭头函数，以便通过 this 拿到 iterableObj 对象
      next: () => {
        // if (i < this.names.length) {
        if (i < 1) {
          return { done: false, value: this.names[i++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

console.log(iterableObj[Symbol.iterator]);

// 1. 第一次调用 iterableObj[Symbol.iterator]() 方法，生成一个迭代器
const iterator1 = iterableObj[Symbol.iterator]()
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

// 2. 第二次调用 iterableObj[Symbol.iterator]() 方法，生成一个迭代器
const iterator2 = iterableObj[Symbol.iterator]()
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.next());

// 3. for...of 可以遍历的东西必须是一个可迭代对象
// const obj = {
//   name: 'zhj',
//   age: 20
// }
// for (const variable of obj) {
//   console.log(variable); // TypeError: obj is not iterable
// }

// for...of 可以看成是用迭代器去一个容器对象中挨个取值（done 为 false 的对象的 value）的语法糖
// for...of 本质上就是用迭代器中的 next() 方法，根据返回的对象中的 done 的值来决定是否继续遍历 value，当 done 为 true 时就停止遍历
for (const variable of iterableObj) {
  console.log(variable);
}