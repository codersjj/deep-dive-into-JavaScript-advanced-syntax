/*
  怎么拿到异步请求的结果？
      以前的方式：通过回调的方式来拿到异步请求的结果
          弊端：1. 如果是自己封装的请求函数（requestData），需要自己设计好回调函数 callback 的名称，并正确使用；
              2. 如果是使用别人封装的请求函数（requestData）或者第三方库，需要查看文档或源码，才能知道该如何获取到异步请求的结果
              总之，使用回调函数的方式沟通成本比较高。

      现在（ES6 开始）：有了更好的方案，ECMAScript 新增了 Promise 特性，对如何获取异步请求的结果做了规范，大家都安装这种规范来写代码，就可以以一种简雅的方式拿到异步请求的结果，减少了沟通成本。
*/

// request.js
function requestData(url, successCallback, failureCallback) {
  // 使用定时器 setTimeout 模拟网络请求
  setTimeout(() => {
    // 拿到请求的结果
    // 如果 url 传入的是 http://httpbin.org/get，请求成功
    if (url === 'http://httpbin.org/get') {
      // 请求成功
      const names = ['alex', 'alan', 'jack']
      successCallback(names)
      // return 的结果外面是拿不到的，而且，这里还是异步的
      // return names
    } else { // 否则，请求失败
      // 请求失败
      const err = '请求失败，url 错误'
      failureCallback(err)
      // return 的结果外面是拿不到的，而且，这里还是异步的
      // return '请求失败的信息'
    }
  }, 2000)
}

// main.js
// 以前获取异步请求结果的方式：回调函数方式
requestData('http://httpbin.org/get', (res) => {
  console.log('res:', res)
}, (err) => {
  console.log('err:', err)
})

// 现在（ES6 开始）有了更好的方案：Promise（承诺、期约），它已经规范好了所有的代码编写逻辑
function requestData2(url) {
  return '承诺'
}

const chengnuo = requestData2('http://httpbin.org/get')
