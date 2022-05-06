function isObject(value) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(value) {
  // 判断传入的 value 是否是对象类型
  if (!isObject(value)) {
    return value
  }

  // 判断传入的对象是否为数组
  const newObj = Array.isArray(value) ? [] : {}

  for (const key in value) {
    newObj[key] = deepClone(value[key])
  }

  return newObj
}

// 测试代码
const obj = {
  name: 'zhj',
  age: 20,
  friend: {
    name: 'wy',
    address: {
      city: '北京'
    }
  },
  hobbies: ['running', 'swimming', 'football']
}

const newObj = deepClone(obj)
console.log(obj === newObj)
obj.name = 'wy'
obj.friend.name = '王毅'
obj.friend.address.city = '上海'
console.log(newObj)