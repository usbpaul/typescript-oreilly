```ts
// --------------------------
// Exercise 4.1: Intersection
// --------------------------

function exercise1() {
  // Define a type Identified that has the properties of a generic type T and an additional property id of type string.
  type Identified<T> = 'TODO';

  function identified<T>(obj: object, id: string): Identified<T> {
    return {
      ...obj,
      id,
    };
  }

  const todo = {
    title: 'Clean up',
    done: false,
  };

  const identifiedTodo = identified(todo, '123');
  identifiedTodo.id satisfies string;
  identifiedTodo.title satisfies string;
  identifiedTodo.done satisfies boolean;
}
exercise1();

// -------------------------
// Exercise 4.2: Type Guards
// -------------------------

// Define a type guard that narrows the type of `obj` to a WorkItem when it returns true.

function exercise2() {
  interface WorkItem {
    title: string;
    done: boolean;
  }

  function isWorkItem(obj: unknown): boolean {
    // TODO: Implement this function
    return false;
  }

  const maybeWork =
    Math.random() > 0.5 ? { title: 'Clean room', done: false } : 42;
  if (isWorkItem(maybeWork)) {
    maybeWork.title satisfies string;
    maybeWork.done satisfies boolean;
  }
}
exercise2();

// ---------------------------------
// Exercise 4.3: Assertion functions
// ---------------------------------

// Define an assertion functions by changing the return types of the "assert" and "assertString" functions.
function exercise3() {
  // TODO! Update the return type of this function
  function assert(check: unknown, expectedType: string): void {
    if (!check) {
      throw new Error(`Expected "${expectedType}"`);
    }
  }

  // TODO! Update the return type of this function
  function assertString(obj: unknown): void {
    assert(typeof obj === 'string', 'string');
  }

  function countWords(obj: unknown): number {
    assertString(obj);
    return obj.split(' ').length;
  }

  console.log(countWords('Hello world'));
  try {
    countWords(42);
  } catch (e) {
    assert(e instanceof Error, 'Error');
    console.log(`Caught error: ${e.message}`);
  }
}
exercise3();

// --------------------------
// Exercise 4.3: Type queries
// --------------------------

function exercise4() {
  const calculator = {
    add(a: number, b: number): number {
      return a + b;
    },
  };

  // Oops! Should have the same shape as `calculator`, but it doesn't. Use a type query to make the compiler spot this error.
  const fakeCalculator = {
    sum(a: number, b: string): number {
      return 42;
    },
  };

  const person = {
    name: 'John',
    address: {
      street: 'Main Street',
      city: 'London',
    },
  };

  // Oops! Should have the same shape as `person.address[]`, but it doesn't. Use a type query to make the compiler spot this error.
  const addresses = [
    { street: 'Main Street', location: 'London', zip: '1234AC' },
  ];
}
exercise4();
```
