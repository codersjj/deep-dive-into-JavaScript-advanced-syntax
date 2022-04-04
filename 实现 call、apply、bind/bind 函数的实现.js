Function.prototype.jjBind = function(thisArg, ...argArray) {
  // 1. 获取到真正需要调用的函数
  const fn = this

  // 2. 绑定 this
  thisArg = (thisArg === null || thisArg === undefined) ? globalThis : Object(thisArg)

  function proxyFn(...args) {
    const fnKey = Symbol()
    // 3. 将真正需要调用的函数放到 thisArg 对象上进行调用
    thisArg[fnKey] = fn
    // 注意：需要对前后两次传入的参数进行“合并”
    const res = thisArg[fnKey](...argArray, ...args)
    delete thisArg[fnKey]

    // 4. 返回结果
    return res
  }

  // 返回绑定 this 后的函数
  return proxyFn
}

function sum(num1, num2, num3) {
  console.log('sum 函数被调用了~', this, num1, num2, num3);
  return num1 + num2 + num3
}

const obj = { name: 'coderzhj' }
const newSum = sum.bind(obj, 100, 200)
const newSumRes = newSum(300)
console.log('newSumRes:', newSumRes)

const jjNewSum = sum.jjBind(obj, 100, 200)
const jjNewSumRes = jjNewSum(300)
console.log('jjNewSumRes:', jjNewSumRes)
