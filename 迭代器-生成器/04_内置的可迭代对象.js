// 1. 数组就是一个可迭代对象
const names = ['wy', 'djx', 'ly']
// 相当于
// const names = new Array('wy', 'djx', 'ly')

console.log(names[Symbol.iterator]);

const iterator = names[Symbol.iterator]()
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const item of names) {
  console.log(item);
}

// 2. Map/Set 类型的对象也都是可迭代对象
const set = new Set()

console.log(set[Symbol.iterator]);

set.add(10)
set.add(100)
set.add(1000)
for (const item of set) {
  console.log(item);
}

// 3. 函数中的 arguments 也是可迭代对象
function foo(a, b, c) {
  console.log(arguments[Symbol.iterator]);
  for (const arg of arguments) {
    console.log(arg);
  }
}
foo(1, 2, 3)