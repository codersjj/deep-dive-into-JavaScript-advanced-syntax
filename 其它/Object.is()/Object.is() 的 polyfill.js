/*
  在实现 Object.is() 的 polyfill 之前，先来解释一下什么是 polyfill。

    维基百科上的解释是这样的：“In software development, a polyfill is code that implements a feature of the development environment that does not natively support the feature.”

    翻译一下就是：“在软件开发中，polyfill 是一段代码，用于在原生不支持某特性的开发环境中，实现该特性。”

  因为 Object.is() 方法是在 ECMAScript 2015(ES6) 规范中首次引入的，所以在 ES6 规范以前，是没有 Object.is() 这个方法的，需要通过其他方式来实现这个方法。

  Object.is() 方法用来比较两个值是否为相同值（the same value），类似于 === 运算符，但有一些区别：

    Object.is(NaN, NaN) === true，而 NaN === NaN 为 false

    Object.is(+0, -0) === false，而 +0 === -0 为 true

    Object.is() 的这个设计是为了更好地处理 NaN、零值的比较。

  事实上，Object.is() 不进行类型转换，也不特殊处理 NaN、-0 和 +0（这使得它的行为与 === 相同，除了针对这些特殊数值的行为）。

    所以 Object.is() 相比 === 更适合比较 NaN 和区分 +0、-0 的场景，其他情况仍可使用 === 替代。

  Object.is() 内部是用 SameValue 算法实现的
*/

// const { isNaN } = require('../../utils/isNaN')
import isNaN from '../../utils/isNaN.js'

function is_v1(value1, value2) {
  // 情况 1
  // is(NaN, NaN) => true
  // ECMAScript 代码中判断一个值 X 是否为 NaN 的可靠方法是使用如下表达式：X !== X，当且仅当 X 为 NaN 时，结果才为 true。
  if (value1 !== value1 && value2 !== value2) {
    return true
  }

  // 情况 2
  // is(0, -0) => false
  // is(+0, -0) => false
  // is(-0, 0) => false
  // is(-0, +0) => false
  if (value1 === 0 && value2 === 0 && 1 / value1 !== 1 / value2) {
    return false
  }

  // 其它情况
  return value1 === value2
}

// 重构 1
function is_v2(value1, value2) {
  // 实现 SameValue 算法
  if (value1 === value2) {
    // +0 不等于 -0
    return value1 !== 0 || 1 / value1 === 1 / value2
  }
  // NaN 等于 NaN
  // return value1 !== value1 && value2 !== value2
  const { isNaN } = require('../../utils/isNaN')
  return isNaN(value1) && isNaN(value2)
}

// 重构 2
function is_v3(value1, value2) {
  return (value1 === value2 && (value1 !== 0 || 1 / value1 === 1 / value2)) ||
    (value1 !== value1 && value2 !== value2)
}

// 简化
function is_v4(x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
}

function is(x, y) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (isNaN(x) && isNaN(y))
}

// module.exports = {
//   is_v2,
//   is
// }
export default is


/*
  参考链接：
  https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  https://tc39.es/ecma262/multipage/global-object.html#sec-isnan-number:~:text=A%20reliable%20way%20for%20ECMAScript%20code%20to%20test%20if%20a%20value%20X%20is%20NaN%20is%20an%20expression%20of%20the%20form%20X%20!%3D%3D%20X.%20The%20result%20will%20be%20true%20if%20and%20only%20if%20X%20is%20NaN
  https://github.com/facebook/react/blob/main/packages/shared/objectIs.js
*/