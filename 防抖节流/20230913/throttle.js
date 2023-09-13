function now() {
  // Date.now() 是 ES5 新增的，在此之前不存在该函数
  if (Date.now) return Date.now()
  // Date.prototype.getTime() 是 ES1 开始就有的
  return new Date().getTime()
}
function throttle(fn, wait) {
  let previous = 0
  function throttled() {
    const _now = now()
    const remaining = wait - (_now - previous)
    if (remaining <= 0) {
      fn()
      previous = _now
    }
  }
  return throttled
}