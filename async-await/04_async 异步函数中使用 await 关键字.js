/* 1. await 关键字必须在 async 函数中使用，在普通函数中不可以使用，否则，代码在解析时就会报错 */
// function foo() {
//   await 123 // SyntaxError: await is only valid in async function
// }

/* 2. await 后面通常会跟一个表达式，这个表达式会返回一个 Promise，await 会等待这个 Promise 的状态变成 fulfilled，之后继续执行异步函数 */
async function foo() {
  // await 表达式
  const res = await requestData() // await 的结果是表达式返回的 Promise resolve 的结果
  // 在 await 后面的表达式返回的 Promise resolve 之前，后面的代码都不会执行，
  // 在 await 后面的表达式返回的 Promise resolve 之后，后面的代码才会执行，所以可以把后面的代码看成是在 Promise 的 then 里面执行的代码
  console.log('后面的代码', res);

  const res2 = await requestData()
  console.log('res2:', res2);
}

function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123)
    }, 2000)
  })
}

foo()