async function foo() {
  console.log('foo function start ~');

  console.log('foo function ~', 111);
  console.log('foo function ~', 222);
  console.log('foo function ~', 333);

  console.log('foo function end ~');
}

console.log('script start ~');
foo()
console.log('script end ~');