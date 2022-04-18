# 简单总结手写 `Promise` 过程

## 1. `Promise` 规范

- https://promisesaplus.com/
- https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects

## 2. `Promise` 类的设计

```js
class JJPromise {}
```

或

```js
function JJPromise() {}
```

## 3. 构造函数的实现

```js
class JJPromise {
  constructor(executor) {
    // 定义状态
    // 定义 resolve、reject 回调
    // 后续别人在用我们的 Promise 时，就会来调用这里的 resolve、reject
    // 那么 resolve 中需要做的是：改变状态、获取传进来的 value、执行微任务队列（执行调用 then() 时传入的成功回调）
    // 那么 reject 中需要做的是：改变状态、获取传进来的 reason、执行微任务队列（执行调用 then() 时传入的失败回调）

    const resolve = (value) => {

    }

    const reject = (reason) => {

    }

    // try catch
    executor(resolve, reject)
  }
}
```

## 4. `then()` 方法的实现

```js
class JJPromise {
  // ...

  then(onFulfilled, onRejected) {
    // this.onFulfilled = onFulfilled
    // this.onRejected = onRejected

    // 1. 判断 onFulfilled 和 onRejected，会给默认值；

    // 2. 返回一个新的 Promise，要考虑这个新的 Promise 内部何时调用 resolve、reject

    // 3. 判断之前的 Promise 状态是否已确定，若已确定，直接执行 onFulfilled/onRejected（注意捕获异常）

    // 4. 否则，将 onFulfilled/onRejected 添加进对应的数组中
    //    添加时又封装了一层函数是为了拿到 onFulfilled/onRejected 执行的结果（不然在构造函数中执行时，这里就拿不到结果了）
    //    push(() => { 执行 onFulfilled/onRejected（捕获异常） })
  }
}
```

## 5. `catch()` 方法的实现

```js
class JJPromise {
  // ...

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
```

## 6. `finally() 方法的实现`

```js
class JJPromise {
  // ...

  finally(onFinally) {
    this.then(() => {
      onFinally()
    }, () => {
      onFinally()
    })
  }
}
```

## 7. `Promise.resolve()/Promise.reject()`



## 8. `all()/allSettled()`

核心：要知道 `new Promise()` 的 `resolve` 和 `reject` 在什么情况下执行。

`all()`：

- 情况一：所有的都有成功的结果时会调用 `new Promise()` 的 `resolve`；
- 情况二：有一个是失败的结果（reject）时会调用 `new Promise()` 的 `reject`

`allSettled()`：

- 一种情况：所有的都会有结果（成功/失败），一定会执行 `new Promise()` 的 `resolve`，不会执行 `new Promise()` 的 `reject`；

## 9. `race()/any()`

核心：要知道 `new Promise()` 的 `resolve` 和 `reject` 在什么情况下执行。

`race()`：

- 一种情况：只要有结果（resolve/reject）

`any()`：

- 情况一：一旦有一个是成功的结果（resolve）；
- 情况二：都没有成功，所有的都是失败（reject），那么就会执行 `new Promise()` 的 `reject`，`reject(一个 AggregateError)`；







