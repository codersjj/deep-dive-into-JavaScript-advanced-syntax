function* foo(num) {
  console.log('函数执行开始~');

  const a = 10 * num
  console.log('第一段代码 ~ a:', a);
  const n = yield a

  // return n

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
// 第一次调用 next() 方法，执行第一段代码
console.log(generator.next());
// 调用 return() 方法，会提前终止生成器函数代码的继续执行，不再执行第二段代码，直接返回 { value: 传给 return() 的参数, done: true }，相当于在上一段代码的后面加上 return
console.log(generator.return(123));
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());

// 使用场景举例：
// 比如当我们拿到上一次 yield 的结果后发现已经是我们想要的结果了，后续不想再继续调用 next() 了，那就可以直接调用 return() 结束生成器函数的执行。