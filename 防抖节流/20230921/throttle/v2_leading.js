function now() {
  if (Date.now) return Date.now()
  return new Date().getTime()
}

function throttle(fn, wait, options = { leading: true, trailing: true }) {
  const { leading, trailing } = options
  let previous = 0

  function throttled() {
    const _now = now()
    if (!leading && !previous) previous = _now
    const remaining = wait - (_now - previous)
    if (remaining <= 0) {
      fn()
      previous = _now
    }
  }

  return throttled
}