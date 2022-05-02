/* 1. 使用回调函数 */
// function requestData(url, successCallback, failureCallback) {
//   setTimeout(() => {
//     if (url === 'coderzhj') {
//       const res = 111
//       successCallback(res)
//     } else {
//       const err = 'url 错误'
//       failureCallback(err)
//     }
//   }, 2000)
// }

// requestData('coderzhj', (res) => {
//   console.log('成功拿到结果：', res);
// }, (err) => {
//   console.log('失败，错误信息：', err);
// })

/* 2. 使用 Promise */
// function requestData(url) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (url === 'coderzhj') {
//         const res = 111
//         resolve(res)
//       } else {
//         const err = 'url 错误'
//         reject(err)
//       }
//     }, 2000);
//   })
// }

// requestData('coderzhj')
//   .then(res => {
//     console.log('成功拿到结果：', res);
//   })
//   .catch(err => {
//     console.log('失败，错误信息：', err);
//   })

/*
  新需求：
  （1）url: 'zhj' -> res: 'zhj'
  （2）url: res + 'aaa' -> res: 'zhjaaa'
  （3）url: res + 'bbb' -> res: 'zhjaaabbb'
  （4）url: res + 'ccc' -> res: 'zhjaaabbbccc'
  ......
*/
function requestData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url)
    }, 2000);
  })
}
/*
  第一种方案：多次回调
  缺点：会出现回调地狱（回调函数里面又嵌套了回调函数）
*/
// requestData('zhj').then(res => {
//   console.log(res)
//   requestData(res + 'aaa').then(res => {
//     console.log(res)
//     requestData(res + 'bbb').then(res => {
//       console.log(res)
//       requestData(res + 'ccc').then(res => {
//         console.log(res)
//       })
//     })
//   })
// })

/*
  第二种方案：借助 Promise 中 then() 的返回值是一个新的 Promise 来解决
  解决了回调地狱的问题
  缺点：代码阅读性差
*/
// requestData('zhj')
//   .then(res => {
//     console.log(res)
//     return requestData(res + 'aaa') // 直接把 Promise 返回出去
//   })
//   .then(res => {
//     console.log(res)
//     return requestData(res + 'bbb')
//   })
//   .then(res => {
//     console.log(res)
//     return requestData(res + 'ccc')
//   })
//   .then(res => {
//     console.log(res)
//   })

/* 第三种方案：Promise + Generator 实现 */
function* getData() {
  const res1 = yield requestData('zhj')
  console.log("function*getData ~ res1", res1)

  const res2 = yield requestData(res1 + 'aaa')
  console.log("function*getData ~ res2", res2)

  const res3 = yield requestData(res2 + 'bbb')
  console.log("function*getData ~ res3", res3)

  const res4 = yield requestData(res3 + 'ccc')
  console.log("function*getData ~ res4", res4)

  // return undefined
}

// function* getDepartment() {
//   const user = yield requestData('id')
//   const department = yield requestData(user.departmentId)
// }

// 手动执行生成器
// const generator = getData()
// generator.next().value.then(res => {
//   console.log(res)
//   generator.next(res).value.then(res => {
//     console.log(res)
//     generator.next(res).value.then(res => {
//       console.log(res)
//       generator.next(res).value.then(res => {
//         console.log(res)
//       })
//     })
//   })
// })

// 实现一个（自动化的）函数，自动执行生成器
// function execGenerator(generatorFn) {
//   const generator = generatorFn()

//   // 递归函数
//   function exec(res) {
//     const result = generator.next(res)
//     if (result.done) {
//       return result.value
//     }
//     result.value.then(res => {
//       exec(res)
//     })
//   }

//   exec()
// }

// execGenerator(getData)
// execGenerator(getDepartment)

// 使用第三方包 co 来自动执行生成器
const co = require('co')
co(getData)
