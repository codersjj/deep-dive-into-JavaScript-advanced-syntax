// 给所有的函数添加 jjApply 方法
Function.prototype.jjApply = function(thisArg, argArray) {
  // 1. 获取需要被执行的函数
  const fn = this

  // 2. 处理需要绑定的 thisArg
  // 将 thisArg 转换为对象类型（防止它是非对象类型时调用方法报错）
  // thisArg 为 null 或 undefined 时，设置为指向全局对象
  thisArg = (thisArg === null || thisArg === undefined) ? globalThis : Object(thisArg)

  // 3. 执行函数
  // 以 this 被隐式绑定的方式调用需要被执行的函数
  const fnKey = Symbol()
  thisArg[fnKey] = fn
  let res
  // 处理没有传参数的情况
  // 写法一：
  // if (!argArray) { // 没有传参数
  //   res = thisArg[fnKey]()
  // } else { // 有传参数
  //   res = thisArg[fnKey](...argArray)
  // }
  // 写法二：
  // argArray = argArray ? argArray : []
  // res = thisArg[fnKey](...argArray)
  // 写法三：
  argArray = argArray || []
  res = thisArg[fnKey](...argArray)
  // 调用完后再删掉
  delete thisArg[fnKey]

  // 4. 返回结果
  return res
}

function sum(num1, num2) {
  // 默认非严格模式下，使用 apply 调用 sum 函数时，如果 thisArg 指定为 null 或 undefined，this 会自动指向全局对象
  console.log('sum 函数被调用了~', this, num1, num2);
  return num1 + num2
}

// JavaScript 的函数的 apply 方法
sum.apply()
sum.apply(undefined)
sum.apply(null)
sum.apply({ name: 'zhj' })
sum.apply(0)
sum.apply('')
sum.apply(123, null)
const applyRes = sum.apply({ name: 'zhj' }, [10, 20])
console.log('applyRes:', applyRes);

// 自己实现的函数的 apply 方法
sum.jjApply()
sum.jjApply(undefined)
sum.jjApply(null)
sum.jjApply({ name: 'zhj' })
sum.jjApply(0)
sum.jjApply('')
sum.jjApply(123, null)
const jjApplyRes = sum.jjApply({ name: 'zhj' }, [10, 20])
console.log('jjApplyRes:', jjApplyRes);