function* foo(num) {
  console.log('函数执行开始~');

  const a = 10 * num
  console.log('第一段代码 ~ a:', a);
  // const n = yield a
  let n
  try {
    n = yield a
  } catch (error) {
    console.log('捕获到异常情况:', error);
    // yield 'abc'
  }

  // return n

  console.log('第二段代码开始执行~');
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

const generator = foo(30)
const res = generator.next()
if (res.value === 300) {
  console.log(generator.throw('error message'));
}
generator.next()
generator.next()
generator.next()
generator.next()
console.log('123');

// 使用场景举例：
// 当我们对上一次调用 next() 方法拿到的结果不满意，想要终止生成器函数中代码的执行，这时就可以调用 throw() 方法（前提是生成器函数中的相应代码没有进行 try catch，否则还是没法终止代码的执行）。
