// 参考规范：https://promisesaplus.com/

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

// 工具函数
function execFnWithErrorCatch(execFn, value, resolve, reject) {
  try {
    const res = execFn(value)
    resolve(res)
  } catch (err) {
    reject(err)
  }
}

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
        queueMicrotask(() => {
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
    const defaultOnRejected = (err) => { throw err }
    onrejected = onrejected || defaultOnRejected

    return new JJPromise((resolve, reject) => {
      // 如果在调用 then() 方法时状态已经确定下来了，则根据状态直接执行对应的回调函数
      // 关键：resolve 或 reject 时需要拿到上一个 then() 方法中回调函数的返回值
      if (this.status === PROMISE_STATUS_FULFILLED && typeof onfulfilled === 'function') {
        execFnWithErrorCatch(onfulfilled, this.value, resolve, reject)
        return
      }
      if (this.status === PROMISE_STATUS_REJECTED && typeof onrejected === 'function') {
        execFnWithErrorCatch(onrejected, this.reason, resolve, reject)
        return
      }
      // 如果状态为 pending，将成功的回调和失败的回调保存到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        if (typeof onfulfilled === 'function') this.onfulfilledFns.push((value) => {
          execFnWithErrorCatch(onfulfilled, value, resolve, reject)
        })
        if (typeof onrejected === 'function') this.onrejectedFns.push((reason) => {
          execFnWithErrorCatch(onrejected, reason, resolve, reject)
        })
      }
    })
  }

  catch(onrejected) {
    // 执行 catch() 时应该去执行原来 then() 方法中的第二个回调
    this.then(undefined, onrejected)
  }
}

const promise = new JJPromise((resolve, reject) => {
  setTimeout(() => {
    reject(222)
    resolve(111)
  }, 2000);
  // throw new Error('executor error message')
})

// console.log('---------- 开始调用 then 方法  ----------');

promise.then(res => {
  console.log('res:', res);
}).catch(err => {
  console.log('err:', err);
})

// 1. 同一个 Promise 对象可以多次调用 then() 方法
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

// 2. 在 Promise 的状态确定之后可以再次调用 then() 方法
setTimeout(() => {
  console.log('setTimeout 中的 promise.then() 执行了~');
  promise.then(res => {
    console.log('setTimeout res:', res);
  }, err => {
    console.log('setTimeout err:', err);
  })
}, 3000);

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
