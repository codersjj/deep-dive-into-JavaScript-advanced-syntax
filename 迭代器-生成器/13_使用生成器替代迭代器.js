/* 1. 迭代器 */
// function createArrayIterator(arr) {
//   let index = 0
//   return {
//     next() {
//       if (index < arr.length) {
//         return { done: false, value: arr[index++] }
//       } else {
//         return { done: true, value: undefined }
//       }
//     }
//   }
// }

// const names = ['wy', 'wxz', 'lm']
// const namesIterator = createArrayIterator(names)

// console.log(namesIterator.next());
// console.log(namesIterator.next());
// console.log(namesIterator.next());
// console.log(namesIterator.next());

/* 2. 使用生成器替代迭代器 */
function* createArrayIterator(arr) {
  // 第一种写法
  // yield arr[0]
  // yield arr[1]
  // yield arr[2]

  // 第二种写法
  // let index = 0
  // yield arr[index++]
  // yield arr[index++]
  // yield arr[index++]

  // 第三种写法
  // for (const item of arr) {
  //   yield item
  // }

  // 第四种写法：yield* 可迭代对象，相当于是上面第三种写法的语法糖
  yield* arr
}

const names = ['wy', 'wxz', 'lm']
const namesIterator = createArrayIterator(names)
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

/* 3. 案例：创建一个函数，这个函数可以迭代一个范围内的数字 */
// function createRangeIterator(start, end) {
//   // let index = start
//   return {
//     next: function() {
//       if (start <= end) {
//         return { done: false, value: start++ }
//       } else {
//         return { done: true, value: undefined }
//       }
//     }
//   }
// }
function* createRangeIterator(start, end) {
  // for (let num = start; num <= end; num++) {
  //   yield num
  // }

  let index = start
  while (index <= end) {
    yield index++
  }

  // while (start <= end) {
  //   yield start++
  // }
}

const rangeIterator = createRangeIterator(2, 5)
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());
console.log(rangeIterator.next());

/* 4. 案例：教室案例 */
class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  enter(student) {
    this.students.push(student)
  }

  // foo = function() {
  //   console.log('foo function');
  // };

  foo = () => {
    console.log('foo function');
  }

  *bar() {
    console.log('bar function');
  }

  [Symbol.iterator] = function* () {
    yield* this.students
  }
  // *[Symbol.iterator]() {
  //   yield* this.students
  // }
}

const classroom1 = new Classroom('复兴中路 88 号 606 室', '计算机教室 606', ['吴军', '王小波', '黄燕'])
classroom1.enter('zhj')

classroom1.foo()
classroom1.bar().next()
for (const stu of classroom1) {
  console.log(stu);
}
