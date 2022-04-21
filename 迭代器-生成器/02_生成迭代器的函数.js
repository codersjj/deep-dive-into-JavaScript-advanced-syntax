function createArrayIterator(array) {
  let index = 0
  return {
    next() {
      if (index < array.length) {
        return { done: false, value: array[index++] }
      } else {
        return { done: true, value: undefined }
      }
    }
  }
}

const names = ['李白', '李清照', '王冕']

const namesIterator = createArrayIterator(names)
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

const dynasties = ['唐朝', '宋朝', '元朝', '明朝', '清朝']

const dynastiesIterator = createArrayIterator(dynasties)
console.log(dynastiesIterator.next());
console.log(dynastiesIterator.next());
console.log(dynastiesIterator.next());
console.log(dynastiesIterator.next());
console.log(dynastiesIterator.next());
console.log(dynastiesIterator.next());

console.log('-----------------------------------');

// 还可以创建无穷迭代器
function createNumberIterator() {
  let num = 0
  return {
    next() {
      return { done: false, value: num++ }
    }
  }
}

const numberIterator = createNumberIterator()
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
