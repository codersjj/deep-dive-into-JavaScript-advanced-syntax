function now() {
  if (Date.now) return Date.now()
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