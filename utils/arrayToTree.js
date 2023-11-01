/**
 * 数组转树形结构
 * @param {array} arr 要转换的数组，数组元素为对象（要求包含 id 和 parentId 属性）
 * @param {*} root 根节点（最外层节点）的 id
 */
function arrayToTree(arr, root = null) {
  const result = [] // 创建一个数组，存放结果
  const idToNodeMap = {} // 创建一个对象，存放节点 id 到节点的映射

  // 1. 遍历 arr，将所有节点放入 idToNodeMap
  arr.forEach(item => {
    idToNodeMap[item.id] = { ...item }
  })

  // 2. 再次遍历，将根节点放入最外层（result 数组），子节点放入父节点
  arr.forEach(item => {
    const { id, parentId } = item
    const node = idToNodeMap[id]

    if (parentId === root) { // 根节点
      result.push(node) // 添加到结果数组中
    } else {
      const parentNode = idToNodeMap[parentId]
      if (!parentNode.children) { // 初始化 children 属性
        parentNode.children = []
      }
      parentNode.children.push(node) // 将节点加入到父节点的 children 中
    }
  })

  // 将结果返回
  return result
}

/**
 * 数组转树形结构
 * 内部实现：只遍历一次
 * @param {array} arr 要转换的数组，数组元素为对象（要求包含 id 和 parentId 属性）
 * @param {*} root 根节点（最外层节点）的 id
 */
function arrayToTreeV2(arr, root = null) {
  const result = []
  const idToNodeMap = {}

  arr.forEach(item => {
    const { id, parentId } = item

    // 映射对象中不存在该节点时，初始化该节点（如果映射对象中已存在该节点，意味着之前该节点已被初始化为父节点，则还需要初始化除 children 之外的属性）
    if (!idToNodeMap[id]) {
      idToNodeMap[id] = { ...item }
    } else {
      idToNodeMap[id] = { ...item, ...idToNodeMap[id] }
    }

    if (parentId === root) { // 根节点
      result.push(idToNodeMap[id]) // 加入到 result 数组中
    } else {
      let parentNode = idToNodeMap[parentId]
      if (!parentNode) { // 初始化父节点
        parentNode = {}
        idToNodeMap[parentId] = parentNode
      }
      if (!parentNode.children) { // 初始化父节点的 children 属性
        parentNode.children = []
      }
      parentNode.children.push(idToNodeMap[id]) // 将子节点加入到父节点的 children 中
    }
  })

  return result
}

/**
 * 数组转树形结构
 * 内部实现：递归
 * @param {array} arr 要转换的数组，数组元素为对象（要求包含 id 和 parentId 属性）
 * @param {*} root 根节点（最外层节点）的 id
 */
function arrayToTreeV3(arr, root = null) {
  const result = []

  arr.forEach(item => {
    const { id, parentId } = item
    if (parentId === root) { // 找到根（父）节点
      const children = arrayToTreeV3(arr, id) // 根据父节点 id 递归调用方法
      if (children.length) item.children = children // 将子节点数组放入父节点
      result.push(item)
    }
  })

  return result

  // return arr
  //   .filter(item => item.parentId === root)
  //   // .map(item => ({ ...item, children: arrayToTreeV3(arr, item.id) }))
  //   .map(item => {
  //     const children = arrayToTreeV3(arr, item.id)
  //     if (children.length) item.children = children
  //     return item
  //   })
}

module.exports = {
  arrayToTree,
  arrayToTreeV2,
  arrayToTreeV3
}