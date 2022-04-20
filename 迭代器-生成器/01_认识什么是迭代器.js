// 迭代器是一个对象，一个可以帮助我们遍访（遍历）容器对象（数据结构）的对象。
// 在 JavaScript 中，迭代器这个对象需要符合迭代器协议（iterator protocol）：
// 迭代器协议定义了产生一系列值（有限个或无限个）的标准方式，那么在 js 中，这个标准就是实现一个特定的 next() 方法
const iterator = {
  next: function() {
    return { done: true, value: 123 }
  }
}

// 数组
const names = ['sy', 'wy', 'sc']

// 创建一个迭代器对象来访问数组
let i = 0
const namesIterator = {
  next() {
    // return { done: false, value: 'sy' }
    // return { done: false, value: 'wy' }
    // return { done: false, value: 'sc' }
    // return { done: true, value: undefined }
    if (i < names.length) {
      return { done: false, value: names[i++] }
    } else {
      return { done: true, value: undefined }
    }
  }
}

console.log(namesIterator.next()); // { done: false, value: 'sy' }
console.log(namesIterator.next()); // { done: false, value: 'wy' }
console.log(namesIterator.next()); // { done: false, value: 'sc' }
console.log(namesIterator.next()); // { done: true, value: undefined }
console.log(namesIterator.next()); // { done: true, value: undefined }