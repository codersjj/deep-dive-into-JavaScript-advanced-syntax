// 参考规范：https://promisesaplus.com/

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class JJPromise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING

    this.value = undefined
    this.reason = undefined

    this.onfulfilledFns = []
    this.onrejectedFns = []

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED
        this.value = value
        console.log('resolve 被调用了~');
        queueMicrotask(() => {
          this.onfulfilledFns.forEach(onfulfilledFn => {
            if (typeof onfulfilledFn === 'function') {
              onfulfilledFn(this.value)
            }
          })
        })
      }
    }

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED
        this.reason = reason
        console.log('reject 被调用了~');
        queueMicrotask(() => {
          this.onrejectedFns.forEach(onrejectedFn => {
            if (typeof onrejectedFn === 'function') {
              onrejectedFn(this.reason)
            }
          })
        });
      }
    }

    executor(resolve, reject)
  }

  then(onfulfilled, onrejected) {
    // 将成功的回调和失败的回调保存到数组中
    this.onfulfilledFns.push(onfulfilled)
    this.onrejectedFns.push(onrejected)
  }
}

const promise = new JJPromise((resolve, reject) => {
  console.log('executor 执行了~', '状态：pending');
  resolve(111)
  reject(222)
})

console.log('---------- 开始调用 then 方法  ----------');

promise.then(res => {
  console.log('res1:', res);
}, err => {
  console.log('err1:', err);
})

promise.then(res => {
  console.log('res2:', res);
}, err => {
  console.log('err2:', err);
})
