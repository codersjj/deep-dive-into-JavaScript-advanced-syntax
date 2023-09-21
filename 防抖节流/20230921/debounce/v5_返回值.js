function debounce(fn, wait, immediate, resultCallback) {
  let timer = null
  let isInvoked = false
  let previous = 0
  function debounced(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      const _now = now()
      const passed = _now - previous
      previous = _now
      if (immediate && (!isInvoked || passed >= wait)) {
        const result = fn.apply(this, args)
        if (resultCallback && typeof resultCallback === 'function') {
          resultCallback(result)
        }
        resolve(result)
        isInvoked = true
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback && typeof resultCallback === 'function') {
            resultCallback(result)
          }
          resolve(result)
          timer = null
          isInvoked = false
          previous = 0
        }, wait)
      }
    })
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