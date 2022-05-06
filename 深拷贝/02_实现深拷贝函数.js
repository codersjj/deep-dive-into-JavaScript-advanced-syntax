function isObject(value) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(value) {
  // 判断传入的 value 是否是对象类型
  if (!isObject(value)) {
    return value
  }

  // 判断传入的对象如果是函数类型，那么直接使用同一个函数
  if (typeof value === 'function') {
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
  // 数组类型
  hobbies: ['running', 'swimming', 'football'],
  // 函数类型
  foo: function() {
    console.log('foo function');
  }
}

const newObj = deepClone(obj)
console.log(obj === newObj)
obj.name = 'wy'
obj.friend.name = '王毅'
obj.friend.address.city = '上海'
console.log(newObj)