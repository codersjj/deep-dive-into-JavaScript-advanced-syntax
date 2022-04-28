// 1. 通过在 function 后加一个 * 就定义了一个生成器函数；
// 2. 生成器函数中可以通过 yield 关键字来控制函数的执行流程（想要在哪里暂停就在哪里加 yield）；
// 3. 生成器函数返回一个生成器（一种特殊的迭代器）；

function* foo() {
  console.log('函数执行开始~');

  const a = 100
  console.log('第一段代码 ~ a:', a);
  yield

  const b = 200
  console.log('第二段代码 ~ b:', b);
  yield

  const c = 300
  console.log('第三段代码 ~ c:', c);
  yield

  const d = 400
  console.log('第四段代码 ~ d:', d);
  yield

  console.log('函数执行结束~');
}

// 调用生成器函数时，会给我们返回一个生成器对象
const generator = foo()
// 开始执行第一段代码
generator.next()
// 开始执行第二段代码
generator.next()
// 开始执行第三段代码
generator.next()
// 开始执行第四段代码
generator.next()
generator.next()