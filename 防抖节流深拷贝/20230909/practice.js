// function debounce(fn, wait, immediate = false) {
//   let timer = null
//   let isInvoked = false
//   function debounced(...args) {
//     if (timer) clearTimeout(timer)
//     if (immediate && !isInvoked) {
//       fn.apply(this, args)
//       isInvoked = true
//     }
//     else {
//       timer = setTimeout(() => {
//         fn.apply(this, args)
//         timer = null
//         isInvoked = false
//       }, wait)
//     }
//   }
//   return debounced
// }

function now() {
  // Date.now() 是 ES5 才新增的
  if (Date.now) return Date.now()
  return new Date().getTime()
}

function debounce(fn, wait, immediate = false, resultCallback) {
  let timer = null
  let isInvoked = false
  let previous = now()
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
      }
      else {
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
      isInvoked = false
      previous = now()
      passed = 0
    }
  }
  return debounced
}

function now() {
  // Date.now() 是 ES5 才新增的
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
      if (!previous && !leading) previous = _now
      const remaining = wait - (_now - previous)
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        try {
          const result = fn.apply(this, args)
          if (resultCallback && typeof resultCallback === 'function') resultCallback(result)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        previous = _now
      } else if (trailing && !timer) {
        timer = setTimeout(() => {
          try {
            const result = fn.apply(this, args)
            if (resultCallback && typeof resultCallback === 'function') resultCallback(result)
            resolve(result)
          } catch (error) {
            reject(error)
          }
          previous = leading ? now() : 0
          timer = null
        }, remaining)
      }
    })
  }
  throttled.cancel = function() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    previous = 0
  }
  return throttled
}