// 递归方式
function arrayToTree(arr, rootId = null) {
  const result = []

  arr.forEach(item => {
    const { id, parentId } = item
    if (parentId === rootId) { // 父节点
      const children = arrayToTree(arr, id)
      if (children.length) {
        result.push({ ...item, children })
      } else {
        result.push({ ...item })
      }
    }
  })

  return result
}

// 两次遍历
function arrayToTreeV2(arr, rootId = null) {
  const result = []
  const idToNodeMap = {}

  arr.forEach(item => {
    idToNodeMap[item.id] = { ...item }
  })

  arr.forEach(item => {
    const { id, parentId } = item
    const node = idToNodeMap[id]

    if (parentId === rootId) { // 根节点
      result.push(node)
    } else {
      const parentNode = idToNodeMap[parentId]
      if (!parentNode.children) {
        parentNode.children = []
      }
      parentNode.children.push(node)
    }
  })

  return result
}

// 一次遍历
function arrayToTreeV3(arr, rootId = null) {
  const result = []
  const idToNodeMap = {}

  arr.forEach(item => {
    const { id, parentId } = item

    if (!idToNodeMap[id]) {
      idToNodeMap[id] = { ...item }
    } else {
      idToNodeMap[id] = { ...item, ...idToNodeMap[id] }
    }

    if (parentId === rootId) { // 根节点
      result.push(idToNodeMap[id])
    } else {
      let parentNode = idToNodeMap[parentId]
      if (!parentNode) {
        parentNode = {}
        idToNodeMap[parentId] = parentNode
      }
      if (!parentNode.children) {
        parentNode.children = []
      }
      parentNode.children.push(idToNodeMap[id])
    }
  })

  return result
}

const data = [
  { id: 0, name: 'node0', parentId: null },
  { id: 2, name: 'node2', parentId: 1 },
  { id: 3, name: 'node3', parentId: 1 },
  { id: 4, name: 'node4', parentId: 2 },
  { id: 5, name: 'node5', parentId: 2 },
  { id: 6, name: 'node6', parentId: 3 },
  { id: 1, name: 'node1', parentId: null },
  { id: 7, name: 'node7', parentId: 3 },
];

const tree = arrayToTreeV3(data);
console.log(JSON.stringify(tree, null, 2));