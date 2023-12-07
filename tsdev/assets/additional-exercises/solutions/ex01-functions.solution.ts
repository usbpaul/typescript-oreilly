function assert(check: unknown, msg: string) {
  if (!check) {
    throw new Error(msg);
  }
}

// -----------------------
// Exercise 1.1: Min and max
// -----------------------

function min(arr: number[]): number {
  return Math.min(...arr);
}
function max(arr: number[]): number {
  return Math.max(...arr);
}

const minMax = [1, 2, 3, 4, 5, 6];
const minNumber = min(minMax);
const maxNumber = max(minMax);
assert(minNumber === 1, `The minimum should be 1, got ${minNumber}`);
assert(maxNumber === 6, `The maximum should be 6, got ${maxNumber}`);
console.log('Exercise 1.1 is correct');

// ----------------------------------
// Exercise 1.2: Higher order functions
// ----------------------------------
function devisable(arr: number[], div: number): number[] {
  return arr.filter((num) => num % div === 0);
}; 

const devisableBy3 = devisable([1, 2, 3, 4, 5, 6], 3);
const devisableBy2 = devisable([1, 2, 3, 4, 5, 6], 2);
assert(
  devisableBy3.length === 2,
  `There should be 2 numbers devisable by 3, got ${devisableBy3.length}`
);
assert(
  devisableBy2.length === 3,
  `There should be 3 numbers devisable by 2, got ${devisableBy2.length}`
);
console.log('Exercise 1.2 is correct');


// -----------------------
// Exercise 1.3: Count words
// -----------------------

function countWords(haystack: string, needle: string): number {
  return haystack
    .split(/(\s|\.)/)
    .reduce((acc, word) => (word === needle ? acc + 1 : acc), 0);
}
const text =
  'TypeScript is a free and open-source high-level programming language developed by Microsoft that adds static typing with optional type annotations to JavaScript. It is designed for the development of large applications and transpiles to JavaScript.';
const javaScriptCount = countWords(text, 'JavaScript');
const scriptCount = countWords(text, 'Script');
assert(
  javaScriptCount === 2,
  `"JavaScript" should occur 2 times, was ${javaScriptCount}`
);
assert(scriptCount === 0, `"Script" should occur 0 times, was ${scriptCount}`);
console.log('Exercise 1.3 is correct');

