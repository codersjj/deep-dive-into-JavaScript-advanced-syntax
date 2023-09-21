/* 立即执行后等待至少 wait 时间后再触发事件时，传入的函数依然做延迟执行 */

function debounce(fn, wait, immediate) {
  let timer = null
  let isInvoked = false
  function debounced(...args) {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoked) {
      fn.apply(this, args)
      isInvoked = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
        isInvoked = false
      }, wait)
    }
  }

  return debounced
}