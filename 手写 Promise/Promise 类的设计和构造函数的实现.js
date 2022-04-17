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
          // console.log('resolve ~ this.onfulfilledFns:', this.onfulfilledFns);
          // console.log('this.value:', this.value);
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
          // console.log('reject ~ this.onrejectedFns:', this.onrejectedFns);
          // console.log('this.reason:', this.reason);
          this.onrejectedFns.forEach(onrejectedFn => {
            if (typeof onrejectedFn === 'function') {
              onrejectedFn(this.reason)
            }
          })
        });
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onfulfilled, onrejected) {
    return new JJPromise((resolve, reject) => {
      // 如果在调用 then() 方法时状态已经确定下来了，则根据状态直接执行对应的回调函数
      // 关键：resolve 或 reject 时需要拿到上一个 then() 方法中回调函数的返回值
      if (this.status === PROMISE_STATUS_FULFILLED && typeof onfulfilled === 'function') {
        try {
          const res = onfulfilled(this.value)
          resolve(res)
        } catch (err) {
          reject(err)
        }
        return
      }
      if (this.status === PROMISE_STATUS_REJECTED && typeof onrejected === 'function') {
        try {
          const res = onrejected(this.reason)
          // 注意：Promise 的 then() 方法链式调用时，上一个 then() 方法中的第二个回调函数中除非抛出异常，否则其返回值应该还是交给 resolve() 处理
          resolve(res)
        } catch (err) {
          reject(err)
        }
        return
      }
      // 如果状态为 pending，将成功的回调和失败的回调保存到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onfulfilledFns.push((value) => {
          try {
            const res = onfulfilled(value)
            resolve(res)
          } catch (err) {
            reject(err)
          }
        })
        this.onrejectedFns.push((reason) => {
          try {
            const res = onrejected(reason)
            resolve(res)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
}

const promise = new JJPromise((resolve, reject) => {
  console.log('executor 执行了~', '状态：pending');
  setTimeout(() => {
    // console.log('new Promise 中的 setTimeout 回调执行了~');
    // reject(222)
    resolve(111)
  }, 2000);
  // throw new Error('executor error message')
})

// console.log('---------- 开始调用 then 方法  ----------');

// 1. 同一个 Promise 对象可以多次调用 then() 方法
// promise.then(res => {
//   console.log('res1:', res);
// }, err => {
//   console.log('err1:', err);
// })

// promise.then(res => {
//   console.log('res2:', res);
// }, err => {
//   console.log('err2:', err);
// })

// 2. 在 Promise 的状态确定之后可以再次调用 then() 方法
// setTimeout(() => {
//   console.log('setTimeout 中的 promise.then() 执行了~');
//   promise.then(res => {
//     console.log('setTimeout res:', res);
//   }, err => {
//     console.log('setTimeout err:', err);
//   })
// }, 3000);

// 3. Promise 的 then() 可以链式调用
promise
  .then(res => {
    console.log('---------- 链式调用 ~ res1:', res);
    // return 'aaa'
    throw new Error('error message')
  }, err => {
    console.log('---------- 链式调用 ~ err1:', err);
    // return 'bbb'
    throw new Error('error message')
  })
  .then(res => {
    console.log('---------- 链式调用 ~ res2:', res);
  }, err => {
    console.log('---------- 链式调用 ~ err2:', err);
  })

// const p = new Promise(resolve => {
//   setTimeout(() => {
//     resolve(23)
//   }, 2000);
// })

// p.then(res => {
//   console.log('res1:', res);
// }, err => {
//   console.log('err1:', err);
// })

// p.then(res => {
//   console.log('res2:', res);
// }, err => {
//   console.log('err2:', err);
// })

// setTimeout(() => {
//   console.log('setTimeout 中的 p.then() 执行了~');
//   p.then(res => {
//     console.log('p setTimeout res:', res);
//   }, err => {
//     console.log('p setTimeout err:', err);
//   })
// }, 3000);