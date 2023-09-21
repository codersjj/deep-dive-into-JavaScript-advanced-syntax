function now() {
  if (Date.now) return Date.now()
  return new Date().getTime()
}

function throttle(fn, wait, options = { leading: true, trailing: true }) {
  const { leading, trailing } = options
  let previous = 0
  let timer = null

  function throttled() {
    const _now = now()
    if (!leading && !previous) previous = _now
    const remaining = wait - (_now - previous)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn()
      previous = _now
    } else if (trailing && !timer) {
      timer = setTimeout(() => {
        fn()
        previous = leading ? now() : 0
        timer = null
      }, remaining)
    }
  }

  return throttled
}