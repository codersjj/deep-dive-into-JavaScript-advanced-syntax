function debounce(fn, delay, immediate = false, resultCallback) {
  let timer = null
  // 是否被调用过，用来实现在中途停掉后再次触发事件时，响应函数还能立即执行
  let isInvoke = false

  const _debounce = function(...args) {
    if (timer) clearTimeout(timer)

    // 判断是否要立即执行
    if (immediate && !isInvoke) {
      const result = fn.apply(this, args)
      if (resultCallback && typeof resultCallback === 'function') {
        resultCallback(result)
      }
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        const result = fn.apply(this, args)
        if (resultCallback && typeof resultCallback === 'function') {
          resultCallback(result)
        }
        isInvoke = false
        // 建议重置为初始状态
        timer = null
      }, delay)
    }
  }

  // 添加取消功能
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    // 建议重置为初始状态
    timer = null
    isInvoke = false
  }

  return _debounce
}