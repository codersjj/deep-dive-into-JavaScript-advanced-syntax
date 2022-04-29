function* foo(num) {
  console.log('函数执行开始~');

  const a = 10 * num
  console.log('第一段代码 ~ a:', a);
  // const n = yield
  const n = yield a

  const b = 20 * n
  console.log('第二段代码 ~ b:', b);
  const t = yield b

  const c = 30 * t
  console.log('第三段代码 ~ c:', c);
  yield c

  const d = 40
  console.log('第四段代码 ~ d:', d);
  yield d

  console.log('函数执行结束~');
  return 666
}

/* 生成器上的 next() 方法可以传递参数 */
// foo() 中的第一段代码如果需要使用参数，一般会通过 foo() 传参数
const generator = foo(30)
console.log(generator.next());
// 第二次调用 next() 时，会执行第二段代码
// 传入 next() 的参数的值会作为上一个 yield 的返回值
console.log(generator.next(10));
// 第三次调用 next() 时，会执行第三段代码
console.log(generator.next(50));
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());