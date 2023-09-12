// var cloneForce = require('@jsmini/clone').cloneForce;

function isObject(value) {
  const type = typeof value
  return (value !== null && type === 'object') || type === 'function'
}
// Object.create(null) 的对象，没有hasOwnProperty方法
function hasOwnProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function deepCopyLoop(value, map = new WeakMap()) {
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
function cloneForce(x) {
  const uniqueData = new WeakMap()

  const t = type(x);

  let root = x;

  if (t === 'array') {
      root = [];
  } else if (t === 'object') {
      root = {};
  }

  // 循环数组
  const loopList = [
      {
          parent: root,
          key: undefined,
          data: x,
      }
  ];

  while(loopList.length) {
      // 深度优先
      const node = loopList.pop();
      const parent = node.parent;
      const key = node.key;
      const source = node.data;
      const tt = type(source);

      // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
      let target = parent;
      if (typeof key !== 'undefined') {
          target = parent[key] = tt === 'array' ? [] : {};
      }

      // 复杂数据需要缓存操作
      if (isClone(source)) {
          // 命中缓存，直接返回缓存数据
          let uniqueTarget = uniqueData.get(source);
          if (uniqueTarget) {
              parent[key] = uniqueTarget;
              continue; // 中断本次循环
          }

          // 未命中缓存，保存到缓存
          uniqueData.set(source, target);
      }

      if (tt === 'array') {
          for (let i = 0; i < source.length; i++) {
              if (isClone(source[i])) {
                  // 下一次循环
                  loopList.push({
                      parent: target,
                      key: i,
                      data: source[i],
                  });
              } else {
                  target[i] = source[i];
              }
          }
      } else if (tt === 'object'){
          for(let k in source) {
              if (hasOwnProp(source, k)) {
                  if (isClone(source[k])) {
                      // 下一次循环
                      loopList.push({
                          parent: target,
                          key: k,
                          data: source[k],
                      });
                  } else {
                      target[k] = source[k];
                  }
              }
          }
      }
  }
  

  uniqueData.clear && uniqueData.clear();
  
  return root;
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

const obj2 = cloneForce(obj)
console.log(obj === obj2) // false
obj2.friend.name = 'jack'
obj.friend.address.city = '上海'
console.log(obj.friend.name) // alan
console.log('obj:', obj)
console.log('obj2:', obj2)
console.log(obj.s2 === obj2.s2)

// function createData(depth, breadth) {
//   let data = {}
//   let temp = data
//   for (let i = 0; i < depth; i++) {
//     temp = temp['data'] = {}
//     for (let j = 0; j < breadth; j++) {
//       temp[j] = j
//     }
//   }
//   return data
// }
// const data = createData(2, 1)
// data.myself = data
// console.log(data)
// console.log(deepCopyLoop(data))