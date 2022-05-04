function debounce(fn, delay) {
  // 定义一个定时器，保存上一次的定时器
  let timer = null

  // 真正执行的函数
  const _debounce = function() {
    // 每次触发事件前先取消上一次定时器（第一次的时候 timer 还没有，所以最好用 if 判断一下）
    if (timer) clearTimeout(timer)
    // 延迟执行
    timer = setTimeout(() => {
      // 外部传入的真正要执行的函数
      fn()
    }, delay)
  }

  // 返回一个新的（做了防抖的）函数
  return _debounce
}