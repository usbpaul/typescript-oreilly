console.log(null === null); // true
console.log(true || false); // true
// @ts-expect-error
console.log(2 === '2'); // compile error
console.log(null === undefined); // false
// @ts-expect-error
console.log(false === true); // compile error
console.log(2 + '2'); // 22
// @ts-expect-error
console.log(2 * '2'); // compile error
var a: string;
// @ts-expect-error
console.log(typeof a); // undefined, compile error with `--strict-null-checks`
var b: never;
// @ts-expect-error
console.log(typeof b); // undefined, compile error with `--strict-null-checks`
var c: any = 'test';
console.log(typeof c); // string
var d = true;
// @ts-expect-error
console.log(d.charAt(1)); // compile error
var e: any = true;
console.log(e.charAt(1)); // runtime error
