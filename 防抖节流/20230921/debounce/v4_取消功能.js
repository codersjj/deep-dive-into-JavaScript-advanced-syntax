/* 立即执行后等待至少 wait 时间后再触发事件时，传入的函数再次立即执行 */
function now() {
  if (Date.now) return Date.now()
  return new Date().getTime()
}
function debounce(fn, wait, immediate) {
  let timer = null
  let isInvoked = false
  let previous = 0
  function debounced(...args) {
    if (timer) clearTimeout(timer)
    const _now = now()
    const passed = _now - previous
    previous = _now
    if (immediate && (!isInvoked || passed >= wait)) {
      fn.apply(this, args)
      isInvoked = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        isInvoked = false
        previous = 0
      }, wait)
    }
  }

  debounced.cancel = function() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isInvoked = false
    previous = 0
  }

  return debounced
}