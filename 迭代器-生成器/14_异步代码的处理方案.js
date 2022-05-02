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
function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'coderzhj') {
        const res = 111
        resolve(res)
      } else {
        const err = 'url 错误'
        reject(err)
      }
    }, 2000);
  })
}

requestData('coderzhj')
  .then(res => {
    console.log('成功拿到结果：', res);
  })
  .catch(err => {
    console.log('失败，错误信息：', err);
  })
