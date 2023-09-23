function isObject(value) {
  const type = typeof value
  return (type === 'object' && type !== null) || type === 'function'
}

function deepCopy(value) {
  if (typeof value === 'symbol') return Symbol(value.description)

  if (!isObject(value)) return value

  if (typeof value === 'function') return value

  const newValue = Array.isArray(value) ? [] : {}
  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })
  Object.getOwnPropertySymbols(value).forEach(symbolKey => {
    newValue[symbolKey] = deepCopy(value[symbolKey])
  })

  return newValue
}