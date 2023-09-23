function isObject(value) {
  const type = typeof value
  return (type === 'object' && type !== null) || type === 'function'
}

function deepCopy(value) {
  if (!isObject(value)) return value

  const newValue = Array.isArray(value) ? [] : {}
  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })

  return newValue
}