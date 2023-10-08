/*
  resolve(参数)
  resolve 接收的参数有以下 3 种情况：
    1. 如果是普通的值或者普通的对象，Promise 的状态直接变成 fulfilled
    2. 如果是另一个 Promise 对象，那么当前的 Promise 的状态将由这个传入的 Promise 对象的状态决定（相当于状态进行了移交）
    3. 如果是一个实现了 thenable 接口的对象（一个对象，并且这个对象实现了 then 方法），那么后续会执行（异步调用）这个 then 方法，并且 Promise 的状态将由该 then 方法决定
*/

const newPromise = new Promise((resolve, reject) => {
  // resolve(666)
  // reject(2333)
})

new Promise((resolve, reject) => {
  // resolve()

  // 1. 普通的值或者普通的对象
  // resolve(111)
  // resolve({ info: '哈哈哈' })

  // 2. Promise 对象
  // resolve(newPromise)

  // 3. 实现了 thenable 接口的对象（一个对象，这个对象有 then 方法）
  const aThenable = {
    then: function(resolve, reject) {
      // resolve(222)
      reject('啊欧')
    }
  }
  resolve(aThenable)
}).then(res => {
  console.log('res:', res)
}, err => {
  console.log('err:', err)
})

new Promise((resolve) => {
  resolve(333)
}).then(res => {
  console.log('another res:', res)
})