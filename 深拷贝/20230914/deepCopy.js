function isObject(value) {
  const type = typeof value
  return (type === 'object' && value !== null) || type === 'function'
}
function deepCopy(value, map = new WeakMap()) {
  if (typeof value === 'symbol') return Symbol(value.description)
  if (!isObject(value)) return value

  if (typeof value === 'function') return value
  if (Object.prototype.toString.call(value) === '[object Map]') {
    const newMap = new Map()
    value.forEach((item, key) => {
      newMap.set(key, deepCopy(item, map))
    })
    return newMap
  }
  if (Object.prototype.toString.call(value) === '[object Set]') {
    const newSet = new Set()
    value.forEach((item) => {
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

function type(value) {
  // [object Object]
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
function isClone(value) {
  const t = type(value)
  return t === 'object' || t === 'array'
}
function deepCopyLoop(value) {
  // 这里只对对象和数组进行深拷贝
  const root = Array.isArray(value) ? [] : {}

  // 定义一个栈，用来模拟递归
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

    // 初始化
    let res = parent
    if (key !== undefined) {
      res = parent[key] = {}
    }

    const uniqueData = uniqueList.find(item => item.sourceData === sourceData)
    if (uniqueData) {
      parent[key] = uniqueData.parent
      continue
    }
    uniqueList.push(node)

    for (let key in sourceData) {
      if (Object.prototype.hasOwnProperty.call(sourceData, key)) {
        if (isClone(sourceData[key])) {
          loopList.push({
            sourceData: sourceData[key],
            parent: res,
            key
          })
        } else {
          res[key] = sourceData[key]
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

const data = createData(2, 1)
data.myself = data
console.log(data)
console.log(deepCopyLoop(data))

var b = {val: 1};
var a = {a1: b, a2: b};

console.log(a.a1 === a.a2) // true

var c = deepCopyLoop(a);
console.log(c.a1 === c.a2) // false