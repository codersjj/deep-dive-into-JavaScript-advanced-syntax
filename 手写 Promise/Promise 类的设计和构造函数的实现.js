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

  then(onFulfilled, onRejected) {
    const defaultOnFulfilled = (value) => value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : defaultOnFulfilled

    const defaultOnRejected = (err) => { throw err }
    onRejected = typeof onRejected === 'function' ? onRejected : defaultOnRejected

    return new JJPromise((resolve, reject) => {
      // 如果在调用 then() 方法时状态已经确定下来了，则根据状态直接执行对应的回调函数
      // 关键：resolve 或 reject 时需要拿到上一个 then() 方法中回调函数的返回值
      if (this.status === PROMISE_STATUS_FULFILLED) {
        execFnWithErrorCatch(onFulfilled, this.value, resolve, reject)
        return
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        execFnWithErrorCatch(onRejected, this.reason, resolve, reject)
        return
      }
      // 如果状态为 pending，将成功的回调和失败的回调保存到数组中
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onfulfilledFns.push((value) => {
          execFnWithErrorCatch(onFulfilled, value, resolve, reject)
        })
        this.onrejectedFns.push((reason) => {
          execFnWithErrorCatch(onRejected, reason, resolve, reject)
        })
      }
    })
  }

  catch(onRejected) {
    // 执行 catch() 时应该去执行原来 then() 方法中的第二个回调
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    this.then(onFinally, onFinally)
  }

  static resolve(value) {
    return new JJPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new JJPromise((resolve, reject) => reject(reason))
  }

  static all(promises) {
    return new JJPromise((resolve, reject) => {
      // 关键问题：什么时候调 resolve() 方法，什么时候调 reject() 方法
      const values = []
      promises.forEach(promise => {
        promise.then(res => {
          values.push(res)
          if (values.length === promises.length) {
            resolve(values)
          }
        }, reject)
      })
    })
  }

  static allSettled(promises) {
    return new JJPromise((resolve, reject) => {
      // 关键问题：什么时候调 resolve() 方法，什么时候调 reject() 方法
      const results = []
      promises.forEach(promise => {
        promise.then(res => {
          results.push({
            status: PROMISE_STATUS_FULFILLED,
            value: res
          })
          if (results.length === promises.length) {
            resolve(results)
          }
        }, err => {
          results.push({
            status: PROMISE_STATUS_REJECTED,
            reason: err
          })
          if (results.length === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static race(promises) {
    return new JJPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }

  static any(promises) {
    const reasons = []
    return new JJPromise((resolve, reject) => {
      // 一旦拿到一个成功的结果就调用 resolve()
      // 只有所有结果都失败时才调用 reject()
      promises.forEach(promise => {
        promise.then(resolve, err => {
          reasons.push(err)
          if (reasons.length === promises.length) {
            // AggregateError 是 ES12 新增的一种错误类型，用来一次表示多个错误
            reject(new AggregateError(reasons))
          }
        })
      })
    })
  }
}

// JJPromise.resolve("哈哈哈").then(res => {
//   console.log('res:', res);
// })

// JJPromise.reject("error message").catch(err => {
//   console.log('err:', err);
// })

const p1 = new JJPromise((resolve, reject) => {
  setTimeout(() => {
    reject(111)
  }, 1000)
})
const p2 = new JJPromise((resolve, reject) => {
  setTimeout(() => {
    reject(222)
  }, 2000)
})
const p3 = new JJPromise((resolve, reject) => {
  setTimeout(() => {
    reject(333)
  }, 3000)
})

// JJPromise.all([p1, p2, p3]).then(res => {
//   console.log('res:', res);
// }).catch(err => {
//   console.log('err:', err);
// })

// JJPromise.allSettled([p1, p2, p3]).then(res => {
//   console.log('res:', res);
// })

JJPromise.race([p1, p2, p3]).then(res => {
  console.log('res:', res);
}).catch(err => {
  console.log('err:', err);
})

JJPromise.any([p1, p2, p3]).then(res => {
  console.log('res:', res);
}).catch(err => {
  console.log('err:', err.errors);
})