// 1. 比如有一个变量 a，后续一旦它改变了，就去自动执行一段代码
const a = 20

// 要执行的一段代码
console.log('Hello World');
console.log(a * 2);
console.log(a + 2);

// a 的值改变了，自动去执行上面这段代码
a = 21

// 2. 实际应用中，更多的可能是对象的响应式：比如有一个对象，后续一旦它的属性改变了，就去自动执行一段代码
const obj = {
  name: 'zhj',
  age: 20
}

// 要执行的一段代码
const newName = obj.name
console.log('哈哈哈');

// obj 对象 name 属性的值改变了，自动去执行上面这段代码
obj.name = 'wy'