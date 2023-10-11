function isObject(value) {
  const type = typeof value
  return (type === 'object' && value !== null) || type === 'function'
}

function deepCopy(value) {
  // 如果不是对象类型，直接返回
  if (!isObject(value)) return value

  const newValue = {}

  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key])
  })

  return newValue
}