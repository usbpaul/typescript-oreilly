// ----------------------------------
// Exercise 3.1: literal generic type
// ----------------------------------

// TODO: Use generics to make this function return the correct type of the first argument
function createLiteral<T>(value: T): T {
  return value;
}

const beer: 'beer' = createLiteral('beer');
// @ts-expect-error
const theAnswer: 42 = createLiteral(41);

// --------------------------------------
// Exercise 3.2: Generic type constraints
// --------------------------------------
interface Comparable<T> {
  compare(other: T): number;
}

class Amount implements Comparable<Amount> {
  public readonly value;
  constructor(value: number) {
    this.value = value;
  }
  compare(other: Amount): number {
    return this.value - other.value;
  }
}

abstract class BinaryTree<T extends Comparable<T>> {
  static empty<T extends Comparable<T>>(): BinaryTree<T> {
    return {
      add(value) {
        return new TreeNode(value, this, this);
      },
      contains: () => false,
      get length() {
        return 0;
      },
    };
  }
  abstract add(value: T): BinaryTree<T>;
  abstract contains(value: T): boolean;
  abstract get length(): number;
}

class TreeNode<T extends Comparable<T>> extends BinaryTree<T> {
  private readonly value;
  private readonly left;
  private readonly right;
  constructor(value: T, left: BinaryTree<T>, right: BinaryTree<T>) {
    super();
    this.value = value;
    this.left = left;
    this.right = right;
  }

  public add(value: T): BinaryTree<T> {
    const relativeChange = this.value.compare(value);
    if (relativeChange === 0) {
      return this;
    }
    if (relativeChange > 0) {
      return new TreeNode(this.value, this.left, this.right.add(value));
    } else {
      return new TreeNode(this.value, this.left.add(value), this.right);
    }
  }

  contains(value: T): boolean {
    const relativeChange = this.value.compare(value);
    if (relativeChange === 0) {
      return true;
    }
    if (relativeChange > 0) {
      return this.right.contains(value);
    } else {
      return this.left.contains(value);
    }
  }
  get length(): number {
    return 1 + this.left.length + this.right.length;
  }
}

// Tests:
const amounts = BinaryTree.empty<Amount>()
  .add(new Amount(42))
  .add(new Amount(1))
  .add(new Amount(3));
console.log(amounts.length);
console.log(amounts.contains(new Amount(42)));
console.log(amounts.contains(new Amount(42)));

class Name {
  public readonly value;
  constructor(value: string) {
    this.value = value;
  }
  compare(other: Name): number {
    return this.value.localeCompare(other.value);
  }
}

// Uncomment this line to test with Name class, that should work
const names = BinaryTree.empty<Name>()
  .add(new Name('baz'))
  .add(new Name('foo'))
  .add(new Name('bar'));

// ---------------------------------------------------
// Exercise 3.3: Generic type constraints with classes
// ---------------------------------------------------

class Bird {
  fly() {
    console.log('Flap flap flap');
  }
}

class Walrus {
  swim() {
    console.log('Splash splash splash');
  }
}

// TODO: Use generics to make this function return the correct type
function createAnimal<T>(AnimalClass: new () => T): T {
  return new AnimalClass();
}

// These should pass:
const bird: Bird = createAnimal(Bird);
const walrus: Walrus = createAnimal(Walrus);
bird.fly();
walrus.swim();

// This should error:
// @ts-expect-error
const bird2: Bird = createAnimal(Walrus);

// ------------------------------------------------------
// ## Exercise 3.4 - My very own `call` - if time permits
// ------------------------------------------------------

function call<TArgs extends any[], TReturn>(
  fn: { (...args: TArgs): TReturn },
  ...args: TArgs
): TReturn {
  return fn(...args);
}

function increment(n: number) {
  return ++n;
}

console.log(call(increment, 41));
call(console.log, 'test');

// @ts-expect-error
call(increment, '42'); // => ERROR!
// @ts-expect-error
const str: string = call(increment, 42); // => ERROR!
