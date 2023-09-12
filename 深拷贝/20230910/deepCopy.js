function isObject(value) {
  const type = typeof value
  return (value !== null && type === 'object') || type === 'function'
}
function deepCopy(value, map = new WeakMap()) {
  if (typeof value === 'function') return value
  if (typeof value === 'symbol') return Symbol(value.description)
  if (!isObject(value)) return value
  if (Object.prototype.toString.call(value) === '[object Map]') {
    const newMap = new Map()
    value.forEach((item, key) => {
      newMap.set(key, deepCopy(item, map))
    })
    return newMap
  }
  if (Object.prototype.toString.call(value) === '[object Set]') {
    const newSet = new Set()
    value.forEach(item => {
      newSet.add(deepCopy(item, map))
    })
    return newSet
  }
  if (map.has(value)) return map.get(value)
  const newValue = Array.isArray(value) ? [] : {}
  map.set(value, newValue)
  Object.keys(value).forEach(key => {
    newValue[key] = deepCopy(value[key], map)
  })
  Object.getOwnPropertySymbols(value).forEach(key => {
    newValue[key] = deepCopy(value[key], map)
  })
  return newValue
}

function type(x) {
  return Object.prototype.toString.call(x).slice(8, -1).toLowerCase()
}
// 仅对对象和数组进行深拷贝，其他类型，直接返回
function isClone(x) {
  const t = type(x);
  return t === 'object' || t === 'array';
}
function deepCopyLoop(value) {
  const root = Array.isArray(value) ? [] : {}

  const loopList = [
    {
      sourceData: value,
      parent: root,
      key: undefined
    }
  ]

  const uniqueList = []
  while (loopList.length) {
    const node = loopList.pop()
    const { sourceData, parent, key } = node

    let res = parent
    if (key !== undefined) {
      res = parent[key] = {}
    }

    const uniqueData = uniqueList.find(item => item.source === sourceData)
    if (uniqueData) {
      parent[key] = uniqueData.target
      continue
    }

    uniqueList.push({
      source: sourceData,
      target: res
    })

    for (let k in sourceData) {
      if (sourceData.hasOwnProperty(k)) {
        if (isClone(sourceData[k])) {
          loopList.push({
            sourceData: sourceData[k],
            parent: res,
            key: k
          })
        } else {
          res[k] = sourceData[k]
        }
      }
    }
  }

  return root
}

function createData(depth, breadth) {
  let data = {}
  let temp = data
  for (let i = 0; i < depth; i++) {
    temp = temp['data'] = {}
    for (let j = 0; j < breadth; j++) {
      temp[j] = j
    }
  }
  return data
}

/* test */
const s1 = Symbol('aaa')
const s2 = Symbol('bbb')
const obj = {
  name: 'zhj',
  friend: {
    name: 'alan',
    address: {
      city: '北京'
    }
  },
  hobbies: ['football', 'basketball', 'volleyball'],
  sayHello: function() {
    console.log('Hello')
  },
  [s1]: 'abc',
  s2: s2,
  m: new Map([['a', 'aaa'], ['b', 'bbb']]),
  s: new Set(['a', 'b', 'c'])
}

obj.myself = obj

const obj2 = deepCopyLoop(obj)
// console.log('obj2:', obj2)
console.log(obj === obj2) // false
obj2.friend.name = 'jack'
obj.friend.address.city = '上海'
console.log(obj.friend.name) // alan
console.log('obj:', obj)
console.log('obj2:', obj2)
console.log(obj.s2 === obj2.s2)
// console.log(obj2.myself.myself.myself)

// const data = createData(2, 1)
// data.myself = data
// console.log(data)
// console.log(deepCopyLoop(data))

// var b = {val: 1};
// var a = {a1: b, a2: b};

// console.log(a.a1 === a.a2) // true

// var c = deepCopyLoop(a);
// console.log(c.a1 === c.a2) // false