async function foo() {
  console.log('foo function start ~');

  console.log('中间代码');

  console.log('foo function end ~');

  // 1. 返回一个普通值
  // return 123
  // return { name: 'wy' }

  // 2. 返回一个实现了 thenable 接口的对象
  // return {
  //   then: function(resolve, reject) {
  //     resolve(666)
  //   }
  // }

  // 3. 返回一个 Promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('哈哈哈')
    }, 2000)
  })
}

// 异步函数一定会返回一个 Promise
const promise = foo()
console.log(promise);
promise.then(res => {
  console.log('promise then function exec:', res);
})

console.log('后续还有代码 ~');