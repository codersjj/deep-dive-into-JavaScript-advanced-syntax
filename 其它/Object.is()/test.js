console.log('-------------------- test Number.isNaN() --------------------')

console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN(Number.NaN)); // true
console.log(Number.isNaN(0 / 0)); // true
console.log(Number.isNaN(37)); // false

// The following are all false
console.log(Number.isNaN("NaN"));
console.log(Number.isNaN(undefined));
console.log(Number.isNaN({}));
console.log(Number.isNaN("blabla"));
console.log(Number.isNaN(true));
console.log(Number.isNaN(null));
console.log(Number.isNaN("37"));
console.log(Number.isNaN("37.37"));
console.log(Number.isNaN(""));
console.log(Number.isNaN(" "));

console.log('-------------------- Number.isNaN() polyfill --------------------')
// var { isNaN_v1 } = require("../../utils/isNaN");
// const { isNaN } = require("../../utils/isNaN");
// var { isNaN_v1 } = require("../../utils/isNaN");
import isNaN from "../../utils/isNaN.js"

console.log(isNaN(NaN)); // true
console.log(isNaN(Number.NaN)); // true
console.log(isNaN(0 / 0)); // true
console.log(isNaN(37)); // false

// The following are all false
console.log(isNaN("NaN"));
console.log(isNaN(undefined));
console.log(isNaN({}));
console.log(isNaN("blabla"));
console.log(isNaN(true));
console.log(isNaN(null));
console.log(isNaN("37"));
console.log(isNaN("37.37"));
console.log(isNaN(""));
console.log(isNaN(" "));


console.log('-------------------- test Object.is() --------------------')
// const { is_v2, is } = require("./Object.is() 的 polyfill");
import is from './Object.is() 的 polyfill.js'

// Case 1: Evaluation result is the same as using ===
console.log(Object.is(25, 25)); // true
console.log(Object.is("foo", "foo")); // true
console.log(Object.is("foo", "bar")); // false
console.log(Object.is(null, null)); // true
console.log(Object.is(undefined, undefined)); // true
// console.log(Object.is(window, window)); // true
console.log(Object.is([], [])); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
console.log(Object.is(foo, foo)); // true
console.log(Object.is(foo, bar)); // false
console.log(Object.is(foo, sameFoo)); // true

// Case 2: Signed zero
console.log(Object.is(0, -0)); // false
console.log(Object.is(+0, -0)); // false
console.log(Object.is(-0, -0)); // true

// Case 3: NaN
console.log(Object.is(NaN, 0 / 0)); // true
console.log(Object.is(NaN, Number.NaN)); // true

console.log('-------------------- Object.is() polyfill --------------------')
// Case 1: Evaluation result is the same as using ===
console.log(is(25, 25)); // true
console.log(is("foo", "foo")); // true
console.log(is("foo", "bar")); // false
console.log(is(null, null)); // true
console.log(is(undefined, undefined)); // true
// console.log(is(window, window)); // true
console.log(is([], [])); // false
const foo2 = { a: 1 };
const bar2 = { a: 1 };
const sameFoo2 = foo2;
console.log(is(foo2, foo2)); // true
console.log(is(foo2, bar2)); // false
console.log(is(foo2, sameFoo2)); // true

// Case 2: Signed zero
console.log(is(0, -0)); // false
console.log(is(+0, -0)); // false
console.log(is(-0, -0)); // true

// Case 3: NaN
console.log(is(NaN, 0 / 0)); // true
console.log(is(NaN, Number.NaN)); // true
