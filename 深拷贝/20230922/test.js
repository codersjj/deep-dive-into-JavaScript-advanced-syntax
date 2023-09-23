


const original = new Map([['a', 1]])

const copy = new Map(original) 

copy.set('a', 2)

console.log(original.get('a')) // 2