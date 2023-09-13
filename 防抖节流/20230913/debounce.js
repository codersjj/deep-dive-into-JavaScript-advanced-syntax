function now() {
  // Date.now() 是 ES5 新增的，在此之前不存在该函数
  if (Date.now) return Date.now()
  return new Date().getTime()
}
function debounce(fn, wait, immediate = false, resultCallback) {
  let timer = null
  let isInvoked = false
  let previous = 0
  let passed = 0
  function debounced(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      passed = now() - previous
      previous = now()
      if (immediate && (!isInvoked || passed >= wait)) {
        const result = fn.apply(this, args)
        if (resultCallback && typeof resultCallback === 'function') resultCallback(result)
        resolve(result)
        isInvoked = true
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args)
          if (resultCallback && typeof resultCallback === 'function') resultCallback(result)
          resolve(result)
          timer = null
          isInvoked = false
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
    passed = 0
  }

  return debounced
}