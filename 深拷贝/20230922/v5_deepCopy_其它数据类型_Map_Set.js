function isObject(value) {
  const type = typeof value
  return (type === 'object' && type !== null) || type === 'function'
}

function deepCopy(value) {
  if (typeof value === 'symbol') return Symbol(value.description)

  if (!isObject(value)) return value

  if (typeof value === 'function') return value
  if (Object.prototype.toString.call(value) === '[object Map]') {
    const newMap = new Map()
    value.forEach((item, key) => {
      newMap.set(key, deepCopy(item))
    })
    return newMap
  }
  if (Object.prototype.toString.call(value) === '[object Set]') {
    const newSet = new Set()
    value.forEach((item) => {
      newSet.add(deepCopy(item))
    })
    return newSet
  }

  const newValue = Array.isArray(value) ? [] : {}
  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })
  Object.getOwnPropertySymbols(value).forEach(symbolKey => {
    newValue[symbolKey] = deepCopy(value[symbolKey])
  })

  return newValue
}