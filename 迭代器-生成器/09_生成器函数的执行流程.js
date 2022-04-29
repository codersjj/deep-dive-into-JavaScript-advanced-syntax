// 当遇到 yield 时，生成器会暂停执行；
// 当遇到 return 时，生成器之后就停止执行了。
function* foo() {
  console.log('函数执行开始~');

  const a = 100
  console.log('第一段代码 ~ a:', a);
  // 把当前这段代码想要返回的值跟在 yield 的后面
  yield a
  // return a

  const b = 200
  console.log('第二段代码 ~ b:', b);
  yield b

  const c = 300
  console.log('第三段代码 ~ c:', c);
  yield c

  const d = 400
  console.log('第四段代码 ~ d:', d);
  yield d

  console.log('函数执行结束~');

  // return undefined
  return 666
}

// 生成器本质上是一个迭代器，所以可以调用 next() 方法，同时拿到其返回的对象（{ done: xxx, value: xxx }）
const generator = foo()
console.log('返回值 1:', generator.next());
console.log('返回值 2:', generator.next());
console.log('返回值 3:', generator.next());
console.log('返回值 4:', generator.next());
console.log('返回值 5:', generator.next());
console.log('返回值 6:', generator.next());
