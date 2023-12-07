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
  if (shape.kind === 'square') {
    return shape.size * shape.size;
  }
  return shape.height * shape.width;
}

// -------------------------------------
// Exercise 5.2: Exhaustiveness checking
// -------------------------------------

type LanguageCode = 'nl' | 'en' | 'fr' | 'de';

interface Config {
  language: LanguageCode;
}

const config: Config = { language: 'nl' };

function getGreeting(name: string): string {
  switch (config.language) {
    case 'nl':
      return `Welkom ${name}`;
    case 'en':
      return `Welcome ${name}`;
    case 'fr':
      return `Bienvenue ${name}`;
    case 'de':
      return `Willkommen ${name}`;
    default:
      throw new Error(
        `language ${config.language satisfies never} is not supported!`
      );
  }
}
