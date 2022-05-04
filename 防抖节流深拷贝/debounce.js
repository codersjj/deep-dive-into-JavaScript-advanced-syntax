function debounce(fn, delay, immediate = false) {
  let timer = null
  // 是否被调用过，用来实现在中途停掉后再次触发事件时，响应函数还能立即执行
  let isInvoke = false

  const _debounce = function(...args) {
    if (timer) clearTimeout(timer)

    // 判断是否要立即执行
    if (immediate && !isInvoke) {
      fn.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
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