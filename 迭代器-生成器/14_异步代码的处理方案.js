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
requestData('zhj')
  .then(res => {
    console.log(res)
    return requestData(res + 'aaa') // 直接把 Promise 返回出去
  })
  .then(res => {
    console.log(res)
    return requestData(res + 'bbb')
  })
  .then(res => {
    console.log(res)
    return requestData(res + 'ccc')
  })
  .then(res => {
    console.log(res)
  })
