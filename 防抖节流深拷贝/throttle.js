function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing, resultCallback } = options

  // 记录上一次的开始时间（最近一次响应函数执行的时间点）
  let lastTime = 0
  let timer = null

  // 事件触发时，真正执行的函数
  const _throttle = function(...args) {
    return new Promise((resolve, reject) => {
      // 获取当前事件触发时的时间
      const currentTime = Date.now()

      if (!lastTime && !leading) lastTime = currentTime

      // 计算还剩余多长时间需要去执行响应函数
      const remainTime = interval - (currentTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        // 剩余时间小于等于 0 时真正触发响应函数
        const result = fn.apply(this, args)
        if (resultCallback) {
          resultCallback(result)
        }
        resolve(result)
        // 更新最近一次响应函数执行的时间点，以便开始下一个计时周期
        lastTime = currentTime

        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback) {
            resultCallback(result)
          }
          resolve(result)
          timer = null
          lastTime = !leading ? 0 : new Date().getTime()
        }, remainTime)
      }
    })
  }

  _throttle.cancel = function() {
    if (timer) clearTimeout(timer)
    // 将数据重置为原始状态
    timer = null
    lastTime = 0
  }

  return _throttle
}