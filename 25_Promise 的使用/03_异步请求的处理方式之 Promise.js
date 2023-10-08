// request.js
function requestData(url) {
  return new Promise((resolve, reject) => {
    // 将异步请求的代码放入到 executor 中
    // 使用定时器 setTimeout 模拟网络请求
    setTimeout(() => {
      // 拿到请求的结果
      // 如果 url 传入的是 http://httpbin.org/get，请求成功
      if (url === 'http://httpbin.org/get') {
        // 请求成功
        const names = ['alex', 'alan', 'jack']
        resolve(names)
      } else { // 否则，请求失败
        // 请求失败
        const err = '请求失败，url 错误'
        reject(err)
      }
    }, 2000)
  })
}

// main.js
const promise = requestData('http://httpbin.org/get')

// promise.then((res) => {
//   console.log('请求成功，res:', res)
// })
// promise.catch((err) => {
//   console.log('请求失败，err:', err)
// })

promise.then((res) => {
  console.log('请求成功，res:', res)
}, (err) => {
  console.log('请求失败，err:', err)
})
