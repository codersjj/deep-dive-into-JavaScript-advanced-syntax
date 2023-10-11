function isObject(value) {
  const type = typeof value
  return (type === 'object' && value !== null) || type === 'function'
}

// const map = new Map()
// function deepCopy(value, map = new Map()) {
function deepCopy(value, map = new WeakMap()) {
  // 属性值（值）是 Symbol 类型
  // 这种情况，我们可能是想要一个新的 Symbol 的
  if (typeof value === 'symbol') return Symbol(value.description)

  // 如果不是对象类型，直接返回
  if (!isObject(value)) return value

  // 如果是函数，直接返回
  if (typeof value === 'function') return value

  // Map
  if (Object.prototype.toString.call(value) === '[object Map]') {
    // return new Map([...value])
    // return new Map(value)
    const newValue = new Map()
    value.forEach((item, key) => {
      newValue.set(key, deepCopy(item, map))
    })
    return newValue
  }
  // Set
  if (Object.prototype.toString.call(value) === '[object Set]') {
    // return new Set([...value])
    // return new Set(value)
    const newValue = new Set()
    value.forEach((item) => {
      newValue.add(deepCopy(item, map))
    })
    return newValue
  }

  if (map.has(value)) {
    return map.get(value)
  }

  // 对象或数组
  const newValue = Array.isArray(value) ? [] : {}

  map.set(value, newValue)

  // 遍历对象自有可枚举字符串属性
  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key], map)
  })
  // 属性名（键）是 Symbol 类型
  // 遍历对象自有可枚举 Symbol 属性
  Object.getOwnPropertySymbols(value).forEach(sKey => {
    // Symbol 一般是用来在同一个对象中保证键（属性）的唯一性，因此对于不同的对象，其实可以共用同一个 Symbol，没有必要根据原先的 Symbol 创建新的 Symbol
    newValue[sKey] = deepCopy(value[sKey], map)
    // 当然，你也可以创建新的 Symbol
    // const newSymbol = Symbol(value.description)
    // newValue[newSymbol] = deepCopy(value[sKey])
  })

  return newValue
}