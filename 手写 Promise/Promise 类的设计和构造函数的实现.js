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
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        console.log('reject 被调用了~');
      }
    }

    executor(resolve, reject)
  }
}

const promise = new JJPromise((resolve, reject) => {
  console.log('executor 执行了~', '状态：pending');
  resolve(111)
  reject(222)
})

// promise.then(res => {
//   console.log('res:', res);
// }, err => {
//   console.log('err:', err);
// })
