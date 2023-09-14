function isObject(value) {
  const type = typeof value
  return (type === 'object' && value !== null) || type === 'function'
}
const map = new Map()
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

  if (map.has(value)) return map.get(value)
  const newValue = Array.isArray(value) ? [] : {}
  map.set(value, newValue)

  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })
  Object.getOwnPropertySymbols(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })
  return newValue
}