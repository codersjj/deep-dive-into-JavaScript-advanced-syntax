console.log('isNaN.js is loading~')

function isNaN_v1(value) {
  console.log('isNaN_v1 is called~')
  // ES6+
  if (Number.isNaN) {
    return Number.isNaN(value)
  }

  // 兼容 ES3
  return value !== value
}

// 优化
// 使用 const 和箭头函数使代码更现代
// 优先使用 Number.isNaN
// 兼容 ES5 的 NaN 判断
// 缓存 isNaN 函数提高性能
const isNaN = Number.isNaN || (value => value !== value)

// module.exports = {
//   isNaN_v1,
//   isNaN
// }
export default isNaN

// 不建议使用全局的 isNaN()（尽管它在 ES1 中就已引入），因为它会将参数转换为 Number 类型后再判断是否为 NaN 值，这可能会出现令人费解的结果（比如 isNaN(undefined) 的结果是 true，因为 undefined 转换为数值类型后会变成 NaN）
// 而 ES6 新增的 Number.isNaN() 方法则不会强制将参数转换为数值。这使得传入通常会转换为 NaN 值但实际上并不是 NaN 值时，也是安全的。这也意味着只有 Number 类型且值为 NaN 的值会返回 true。

// 参考链接：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN