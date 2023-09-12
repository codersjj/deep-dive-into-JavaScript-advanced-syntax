function deepCopyLoop(value) {
  const root = {} // Create an empty object to store the copied data

  const loopList = [ // Create a loop list with the initial data
    {
      parent: root,
      key: undefined,
      data: value
    }
  ]

  while (loopList.length) { // Iterate through the loop list
    const node = loopList.pop() // Get the last element from the loop list
    const { parent, key, data } = node // Extract the parent, key, and data from the node

    let res = parent // Set the result object as the parent
    if (key !== undefined) {
      res = parent[key] = {} // If a key is defined, create a new empty object and assign it to the parent at the key
    }

    for (let k in data) { // Iterate through the properties of the data object
      if (data.hasOwnProperty(k)) { // Check if the property belongs to the data object itself (not inherited)
        if (typeof data[k] === 'object') { // Check if the property value is an object
          loopList.push({ // If it is an object, add it to the loop list for further copying
            parent: res,
            key: k,
            data: data[k]
          })
        } else { // If it is not an object, assign the value directly to the result object
          res[k] = data[k]
        }
      }
    }
  }

  return root // Return the copied object
}