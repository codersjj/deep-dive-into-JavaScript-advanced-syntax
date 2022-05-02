/* 普通函数中抛出异常且没有进行异常捕获时，程序直接崩了，后续代码不会执行 */
// function foo() {
//   console.log('foo function start ~');

//   console.log('中间代码');
//   throw new Error('error message')

//   console.log('foo function end ~');
// }

// foo()

// console.log('后续还有代码 ~');

/* 异步函数中抛出异常且没有进行异常捕获时，异步函数外的后续代码仍会执行 */
async function foo() {
  console.log('foo function start ~');

  console.log('中间代码');
  // 异步函数中的异常，会被作为异步函数返回的 Promise 的 reject 的值
  throw new Error('error message')

  console.log('foo function end ~');
}

const promise = foo()
// promise.then(res => {
//   console.log('promise then function exec:', res);
// })
promise.catch(err => {
  console.log('☞ error:', err);
})

console.log('后续还有代码 ~');