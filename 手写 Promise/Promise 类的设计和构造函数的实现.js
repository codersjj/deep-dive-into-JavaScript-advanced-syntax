// 参考规范：https://promisesaplus.com/

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class JJPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING

    const resolve = () => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        console.log('resolve 被调用了~');
      }
    }

    const reject = () => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        console.log('reject 被调用了~');
      }
    }

    executor(resolve, reject)
  }
}

const promise = new JJPromise((resolve, reject) => {
  console.log('executor 执行了~', '状态：pending');
  resolve()
  reject()
})