// 解决栈溢出问题

function type(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

function isClone(value) {
  const t = type(value)
  return t === 'object' || t === 'array'
}

function deepCopyLoop(value) {
  const root = Array.isArray(value) ? [] : {}

  const loopList = [
    {
      value,
      parent: root,
      key: undefined
    }
  ]

  const uniqueList = []

  while (loopList.length) {
    const { value, parent, key } = loopList.pop()

    // 初始化赋值目标，key 为 undefined 则拷贝到父元素，否则拷贝到子元素
    const res = parent
    if (key !== undefined) {
      res = parent[key] = type(value) === 'array' ? [] : {}
    }

    const uniqueData = uniqueList.find(item => item.source === value)
    if (uniqueData) {
      parent[key] = uniqueData.target
      continue
    }

    uniqueList.push({
      source: value,
      target: res
    })

    Object.keys(value).forEach(key => {
      // 只处理对象或数组
      if (isClone(value[key])) {
        loopList.push({
          value: value[key],
          parent: res,
          key
        })
      } else {
        res[key] = value[key]
      }
    })
  }

  return root
}