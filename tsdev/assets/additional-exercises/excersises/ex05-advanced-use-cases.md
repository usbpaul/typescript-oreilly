```ts
// ----------------------------------
// Exercise 5.1: Discriminated Unions
// ----------------------------------
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(shape: Shape): number {
  // TODO: Implement
}

// -------------------------------------
// Exercise 5.2: Exhaustiveness checking
// -------------------------------------

type LanguageCode = 'nl' | 'en' | 'fr' | 'de';

interface Config {
  language: LanguageCode;
}

const config: Config = { language: 'nl' };

function getGreeting(name: string) {
  switch (config.language) {
    case 'nl':
      return `Welkom ${name}`;
    case 'en':
      return `Welcome ${name}`;
    case 'fr':
      return `Bienvenue ${name}`;
    // TODO: I'm missing the case for 'DE'. This should be an error!
    // case 'de':
    //   return `Willkommen ${name}`;
  }
}
```
