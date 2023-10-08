/* const promise = new Promise((resolve, reject) => {

})

promise.then(res => {

}, err => {

})

// 等价于：

new Promise((resolve, reject) => {

}).then(res => {

}, err => {

}) */

new Promise((resolve, reject) => {
  console.log('----------')
  // resolve 或 reject 之前，Promise 处于 pending（待定）状态

  // 注意：状态一旦确定，就不能再更改（比如调用 resolve 之后再调用 reject()，那么 reject() 的调用是没有意义的）
  // resolve() // pending => fulfilled（已兑现）
  reject() // pending => rejected（已拒绝）

  // resolve/reject 后面的代码依然会执行
  console.log('++++++++++')
}).then(res => {
  // 来到这里时，Promise 的状态已经变成 fulfilled/resolved
  console.log('res:', res)
}, err => {
  // 来到这里时，Promise 的状态已经变成 rejected
  console.log('err:', err)
})