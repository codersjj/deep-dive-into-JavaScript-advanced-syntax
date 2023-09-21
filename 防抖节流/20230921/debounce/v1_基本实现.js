function debounce(fn, wait) {
  let timer = null
  function debounced() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }

  return debounced
}