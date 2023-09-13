function now() {
  // Date.now() 是 ES5 新增的，在此之前不存在该函数
  if (Date.now) return Date.now()
  // Date.prototype.getTime() 是 ES1 开始就有的
  return new Date().getTime()
}
function throttle(fn, wait, option = { leading: true, trailing: true }) {
  const { leading, trailing } = option
  let previous = 0
  let timer = null
  function throttled(...args) {
    const _now = now()
    if (!leading && !previous) previous = _now
    const remaining = wait - (_now - previous)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args)
      previous = _now
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        previous = leading ? now() : 0
        timer = null
      }, remaining)
    }
  }
  return throttled
}