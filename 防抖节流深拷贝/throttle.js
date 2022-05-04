function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options

  // 记录上一次的开始时间（最近一次响应函数执行的时间点）
  let lastTime = 0

  // 事件触发时，真正执行的函数
  const _throttle = function() {
    // 获取当前事件触发时的时间
    const currentTime = Date.now()

    if (!lastTime && !leading) lastTime = currentTime

    // 计算还剩余多长时间需要去执行响应函数
    const remainTime = interval - (currentTime - lastTime)
    if (remainTime <= 0) {
      // 剩余时间小于等于 0 时真正触发响应函数
      fn()
      // 更新最近一次响应函数执行的时间点，以便开始下一个计时周期
      lastTime = currentTime
    }
  }

  return _throttle
}