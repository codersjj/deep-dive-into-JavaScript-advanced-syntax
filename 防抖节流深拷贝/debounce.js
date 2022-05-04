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
      }, delay)
    }
  }

  return _debounce
}