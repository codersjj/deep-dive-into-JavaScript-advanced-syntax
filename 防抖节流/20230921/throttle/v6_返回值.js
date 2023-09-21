function now() {
  if (Date.now) return Date.now()
  return new Date().getTime()
}

function throttle(fn, wait, options = { leading: true, trailing: true }) {
  const { leading, trailing, resultCallback } = options
  let previous = 0
  let timer = null

  function throttled(...args) {
    return new Promise((resolve, reject) => {
      const _now = now()
      if (!leading && !previous) previous = _now
      const remaining = wait - (_now - previous)
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        const result = fn.apply(this, args)
        if (resultCallback && typeof resultCallback === 'function') {
          resultCallback(result)
        }
        resolve(result)
        previous = _now
      } else if (trailing && !timer) {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback && typeof resultCallback === 'function') {
            resultCallback(result)
          }
          resolve(result)
          previous = leading ? now() : 0
          timer = null
        }, remaining)
      }
    })
  }

  throttled.cancel = function() {
    previous = 0
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return throttled
}