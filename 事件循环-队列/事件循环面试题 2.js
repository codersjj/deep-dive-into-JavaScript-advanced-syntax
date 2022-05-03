// async function bar() {
//   console.log(333)
//   return new Promise((resolve) => {
//     console.log(555)
//     resolve()
//   })
// }

// async function foo() {
//   console.log(111)
//   await bar()
//   console.log(222)
// }

// foo()

// console.log(444)
// // 111
// // 333
// // 555
// // 444
// // 222

async function async1 () {
  console.log('async1 start')
  await async2();
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1();

new Promise (function (resolve) {
  console.log('promise1')
  resolve();
}).then (function () {
  console.log('promise2')
})

console.log('script end')
