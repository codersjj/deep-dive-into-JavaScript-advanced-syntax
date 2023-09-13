function now() {
  // Date.now() 是 ES5 新增的，在此之前不存在该函数
  if (Date.now) return Date.now()
  return new Date().getTime()
}
function debounce(fn, wait, immediate = false) {
  let timer = null
  let isInvoked = false
  let previous = 0
  let passed = 0
  function debounced(...args) {
    if (timer) clearTimeout(timer)
    passed = now() - previous
    previous = now()
    if (immediate && (!isInvoked || passed >= wait)) {
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