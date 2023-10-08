/*
  Promise 是一个类，可以翻译为承诺、期约
  当我们需要给调用者一个承诺，承诺待会会把结果回调出去时，就可以创建一个 Promise 对象
  在通过 new 创建 Promise 对象时，需要传入一个回调函数，我们称之为 executor
    这个回调函数 executor 会被立即执行，并且它会接收两个参数：resolve 和 reject，它们也都是回调函数
    当我们调用回调函数 resolve 时，会执行 Promise 对象的 then 方法传入的回调函数；
    当我们调用回调函数 reject 时，会执行 Promise 对象的 catch 方法传入的回调函数
*/

// function foo() {
//   return '承诺'
// }

// const chengnuo = foo()

// function foo() {
//   return new Promise(() => {})
// }

// const promise = foo()

// const promise = new Promise(() => {})

// function Person(name, age) {

// }

// const p = new Person('zhj', 20)

/* class Person {
  constructor(executor) {
    const resolve = function() {

    }
    const reject = function() {

    }
    executor(resolve, reject)
  }
}
const p = new Person((resolve, reject) => {
  console.log('111')
  resolve()
  reject()
})

// 传入的这个函数，被称为 executor
// resolve：回调函数，在成功时回调它
// reject：回调函数，在失败时回调它
const promise = new Promise((resolve, reject) => {
  console.log('传入 Promise 的函数 executor 被立即执行，并且，这个 executor 函数接收两个参数：resolve 和 reject，它们也都是回调函数')
  resolve()
  reject()
}) */

// request.js
function foo() {
  return new Promise((resolve, reject) => {
    // resolve()
    // 可以接收参数
    // resolve('success message')

    // reject()
    // 可以接收参数
    reject('failure message')
  })
}

// main.js
const fooPromise = foo()
// 传入 then 方法的第一个回调函数会在 Promise 执行 resolve 函数时被回调，并且，它会接收一个参数，用来获取执行 resolve 函数时传入的参数
// 传入 then 方法的第二个回调函数会在 Promise 执行 reject 函数时被回调，并且，它会接收一个参数，用来获取执行 reject 函数时传入的参数
fooPromise.then((res) => {
  console.log('res:', res)
}, (err) => {
  console.log('err:', err)
})

// 传入 catch 方法的回调函数会在 Promise 执行 reject 函数时被回调
fooPromise.catch((err) => {
  console.log('catch err:', err)
})