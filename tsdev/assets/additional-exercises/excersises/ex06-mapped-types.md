```ts
// --------------------------
// Exercise 6.1: Lookup types
// --------------------------

function pick(obj: any, prop: string) {
  return obj[prop];
}

// TODO: Change `pick` to be type safe.
interface Star {
  name: string;
  mass: BigInt;
}
const sun: Star = {
  name: 'sun',
  mass: 1_988_470_000_000_000_000_000_000_000_000n,
};

pick(sun, 'name') satisfies string;
pick(sun, 'mass') satisfies BigInt;

// @ts-expect-error
pick(sun, 'mas');
// @ts-expect-error
pick(sun, 'mass').substring(0);

// --------------------------
// Exercise 6.2: Mapped types
// --------------------------

interface Author {
  name: string;
  publisher: string;
}
interface Book {
  title: string;
  pages: number;
  author: Author;
}

// TODO: Create a mapped type based on T, but it provides Promises for each property
type Promisified<T> = {
  // Implement here!
};
declare const bookToFuture: Promisified<Book>;

bookToFuture.title satisfies Promise<string>;
bookToFuture.pages satisfies Promise<number>;
bookToFuture.author satisfies Promise<Author>;

// ------------------------------------------------
// Exercise 6.3: Mapped types and conditional types
// ------------------------------------------------

// TODO: Create a mapped type that represent the JSON serialized and later deserialized version of T.

/** These types are valid JSON primitives */
type JsonPrimitive = null | number | string | boolean;
/** These types are not representable in JSON */
type UnserializableValue = Function | undefined;

type Jsonified<T> = {
  // Implement here!
};

// Tests
class Circle {
  public radius;
  constructor(radius: number) {
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

const c = new Circle(42);

const c2: Jsonified<Circle> = JSON.parse(JSON.stringify(c));

// @ts-expect-error
c2.area;
c2.radius satisfies number;

const cs: Jsonified<Circle[]> = JSON.parse(JSON.stringify([c, c, c]));

cs satisfies Array<any>;
cs[0] satisfies Jsonified<Circle>;
```
