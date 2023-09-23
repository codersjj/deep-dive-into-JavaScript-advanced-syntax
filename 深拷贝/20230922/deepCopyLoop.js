function type(value) {
  // [object Object] -> object
  // [object Array] -> array
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
      sourceData: value,
      parent: root,
      key: undefined
    }
  ]

  const uniqueList = []

  while (loopList.length) {
    const { sourceData, parent, key } = loopList.pop()

    // 初始化赋值目标，key 为 undefined 则拷贝到父元素，否则拷贝到子元素
    let res = parent
    if (key !== undefined) {
      res = parent[key] = type(sourceData) === 'array' ? [] : {}
    }

    const uniqueData = uniqueList.find(item => item.source === sourceData)
    if (uniqueData) {
      parent[key] = uniqueData[target]
      continue
    }

    uniqueList.push({
      source: sourceData,
      target: res
    })

    for (let k in sourceData) {
      if (Object.hasOwn(sourceData, k)) {
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
}