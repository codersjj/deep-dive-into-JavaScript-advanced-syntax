function treeToArr(tree) {
  const arr = []

  const flatten = (node) => {
    arr.push(node)
    const children = node.children
    if (!children || !children.length) return
    children.forEach(cNode => {
      flatten(cNode)
    })
  }

  tree.forEach(node => {
    flatten(node)
  })

  return arr
}

// ---------- test ----------

// const treeData = [
//   {
//     "id": 0,
//     "name": "node0",
//     "parentId": null
//   },
//   {
//     "id": 1,
//     "name": "node1",
//     "parentId": null,
//     "children": [
//       {
//         "id": 2,
//         "name": "node2",
//         "parentId": 1,
//         "children": [
//           {
//             "id": 4,
//             "name": "node4",
//             "parentId": 2
//           },
//           {
//             "id": 5,
//             "name": "node5",
//             "parentId": 2
//           }
//         ]
//       },
//       {
//         "id": 3,
//         "name": "node3",
//         "parentId": 1,
//         "children": [
//           {
//             "id": 6,
//             "name": "node6",
//             "parentId": 3
//           },
//           {
//             "id": 7,
//             "name": "node7",
//             "parentId": 3
//           }
//         ]
//       }
//     ]
//   }
// ]

// const arr = treeToArr(treeData)
// console.log(arr)