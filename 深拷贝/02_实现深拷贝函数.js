function isObject(value) {
  const valueType = typeof value
  return value !== null && (valueType === 'object' || valueType === 'function')
}

function deepClone(value) {
  // 判断传入的 value 如果是 Symbol 类型，那么根据其 description 创建一个新的 Symbol
  if (typeof value === 'symbol') {
    return Symbol(value.description)
  }

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

  // for...in 迭代的是对象的可枚举字符串属性（不包括 Symbol 类型的属性）
  for (const key in value) {
    newObj[key] = deepClone(value[key])
  }

  // 对 Symbol 类型的 key 做特殊处理
  // 获取对象自有的 Symbol 类型的属性名组成的数组
  const symbolKeys = Object.getOwnPropertySymbols(value)
  for (const symbolKey of symbolKeys) {
    // 可以创建一个新的 Symbol 作为 key，但没有必要，因为用 Symbol 作为 key 的目的是在同一个对象中避免相同 key 的情况出现，而我们这里是不同的对象，在不同的对象中使用相同的 key 一般是没有问题的。
    // const newSymbolKey = Symbol(symbolKey.description)
    // newObj[newSymbolKey] = deepClone(value[symbolKey])
    newObj[symbolKey] = deepClone(value[symbolKey])
  }

  return newObj
}

// 测试代码
const s1 = Symbol('aaa')
const s2 = Symbol('bbb')

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
  },
  // Symbol 类型作为 key 或 value
  [s1]: 'symbol aaa',
  s2: s2
}

const newObj = deepClone(obj)
console.log(obj === newObj)
obj.name = 'wy'
obj.friend.name = '王毅'
obj.friend.address.city = '上海'
console.log(newObj)
console.log(newObj.s2 === obj.s2)