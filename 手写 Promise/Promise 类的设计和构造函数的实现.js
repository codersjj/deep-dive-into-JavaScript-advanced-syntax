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
    const defaultOnFulfilled = (value) => value
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : defaultOnFulfilled

    const defaultOnRejected = (err) => { throw err }
    onrejected = typeof onrejected === 'function' ? onrejected : defaultOnRejected

    return new JJPromise((resolve, reject) => {
      // 如果在调用 then() 方法时状态已经确定下来了，则根据状态直接执行对应的回调函数
      // 关键：resolve 或 reject 时需要拿到上一个 then() 方法中回调函数的返回值
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFnWithErrorCatch(onfulfilled, this.value, resolve, reject)
        return
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        execFnWithErrorCatch(onrejected, this.reason, resolve, reject)
        return
      }
      // 如果状态为 pending，将成功的回调和失败的回调保存到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onfulfilledFns.push((value) => {
          execFnWithErrorCatch(onfulfilled, value, resolve, reject)
        })
        this.onrejectedFns.push((reason) => {
          execFnWithErrorCatch(onrejected, reason, resolve, reject)
        })
      }
    })
  }

  catch(onrejected) {
    // 执行 catch() 时应该去执行原来 then() 方法中的第二个回调
    return this.then(undefined, onrejected)
  }

  finally(onfinally) {
    this.then(() => {
      onfinally()
    }, () => {
      onfinally()
    })
  }

  static resolve(value) {
    return new JJPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new JJPromise((resolve, reject) => reject(reason))
  }
}

JJPromise.resolve("哈哈哈").then(res => {
  console.log('res:', res);
})

JJPromise.reject("error message").catch(err => {
  console.log('err:', err);
})