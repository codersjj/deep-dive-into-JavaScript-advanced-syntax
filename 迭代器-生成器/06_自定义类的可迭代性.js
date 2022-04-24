// class Person {

// }
// 默认情况下，类创建出来的对象不是可迭代对象
// const p = new Person()
// for (const item of p) { // TypeError: p is not iterable
//   console.log(item);
// }

// 自己设计一个类，使其创建出来的对象是可迭代对象
// 案例：
// 创建一个“教室”类：
// 1. 教室有其位置、名称、里面的学生；
// 2. 教室中可以进来新的学生（push）；
// 3. 教室类创建出来的教室对象要求是可迭代对象；

class Classroom {
  constructor(address, name, students) {
    this.address = address
    this.name = name
    this.students = students
  }

  enter(student) {
    this.students.push(student)
  }

  // 直接在类中实现可迭代协议（iterable protocol），相当于在 Classroom.prototype 对象上实现了 @@iterator 方法，这样 Classroom 类创建出来的每个实例对象就都是可迭代对象了
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] }
        } else {
          return { done: true, value: undefined }
        }
      }
    }
  }
}

const classroom1 = new Classroom('复兴中路 88 号 606 室', '计算机教室 606', ['吴军', '王小波', '黄燕'])
classroom1.enter('zhj')

// 单独给实例对象实现可迭代协议虽然可以但不是很好，因为这样做意味着如果有多个实例对象，就可能需要这样实现多次。
// classroom1[Symbol.iterator] = function() {
//   let index = 0
//   return {
//     next: () => {
//       if (index < this.students.length) {
//         return { done: false, value: this.students[index++] }
//       } else {
//         return { done: true, value: undefined }
//       }
//     }
//   }
// }

for (const student of classroom1) {
  console.log(student);
}