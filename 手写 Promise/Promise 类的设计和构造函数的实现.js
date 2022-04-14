// 参考规范：https://promisesaplus.com/

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class JJPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING

    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        this.value = value
        console.log('resolve 被调用了~');
        // 这里没有使用 setTimeout，因为 setTimeout 是宏任务，而原生的 Promise 的 then 方法是微任务，所以这里使用 queueMicrotask() 方法将传入的函数延迟调用（延迟调用，但在本轮的主线程的事件循环中就会被执行）
        queueMicrotask(() => {
          // 执行传给 then 方法的第一个回调函数（通过放在 queueMicrotask 中来保证此时 then 方法已执行，this.onFulfilled 已经被赋过值了）
          if (typeof this.onfulfilled === 'function') {
            this.onfulfilled(this.value)
          }
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        console.log('reject 被调用了~');
        queueMicrotask(() => {
          // 执行传给 then 方法的第二个回调函数
          if (typeof this.onrejected === 'function') {
            this.onrejected(this.reason)
          }
        });
      }
    }

    executor(resolve, reject)
  }

  then(onfulfilled, onrejected) {
    this.onfulfilled = onfulfilled
    this.onrejected = onrejected
  }
}

const promise = new JJPromise((resolve, reject) => {
  console.log('executor 执行了~', '状态：pending');
  resolve(111)
  reject(222)
})

console.log('---------- 开始调用 then 方法  ----------');

promise.then(res => {
  console.log('res:', res);
}, err => {
  console.log('err:', err);
})
