Promise.resolve().then(() => {
  console.log(0);
  // 1. 返回普通的值
  // return { name: 'zhj' }
  // return 4

  // 2. 返回 thenable 对象，原生的 Promise 会对里面的 then() 方法加一次微任务
  // return {
  //   then(resolve, reject) {
  //     resolve(4)
  //   }
  // }

  // 3. 返回一个 Promise
  // 不是普通的值，多加一次微任务，
  // Promise.resolve(4) 后续相当于 Promise.resolve(4).then()，又多加一次微任务，
  // 一共多加了两次微任务
  // return Promise.resolve(4)
  return new Promise((resolve, reject) => {
    resolve(4)
  })
}).then((res) => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})
