const CHAR_CODE_A = 'A'.charCodeAt(0);
const CHAR_CODE_Z = 'Z'.charCodeAt(0);
const OFFSET_LATIN_CHARACTER = 55;

class Customer {
  constructor(
    public firstName: string,
    public lastName: string,
    public insertion?: string
  ) {}

  public format(): string {
    if (this.insertion) {
      return `${this.firstName} ${this.insertion} ${this.lastName}`;
    } else {
      return `${this.firstName} ${this.lastName}`;
    }
  }
}

class Iban {
  constructor(
    public readonly countryCode: string,
    public readonly bankCode: string,
    public readonly accountNumber: string,
    public readonly controlNumber: number
  ) {}

  format() {
    const control = String(this.controlNumber).padStart(2, '0');
    const accountNr = String(this.accountNumber).padStart(10, '0');
    const unFormatted = `${this.countryCode}${control}${this.bankCode}${accountNr}`;
    return unFormatted.match(/.{1,4}/g)?.join(' ') ?? unFormatted;
  }

  static generate(
    bankCode: string,
    countryCode: string,
    accountNumber = Math.floor(Math.random() * 10000000000).toString()
  ): Iban {
    const iban = new Iban(
      countryCode,
      bankCode,
      accountNumber,
      controlNumber()
    );
    auditLog(iban, 'created');
    return iban;

    function controlNumber() {
      const accountNumberInteger = `${convert(
        bankCode
      )}${accountNumber}${convert(countryCode)}00`;
      const control = 98n - (BigInt(accountNumberInteger) % 97n);
      return Number(control);
    }

    function convert(chars: string) {
      let result = '';
      for (var i = 0; i < chars.length; i++) {
        if (isCapitalLetter(chars, i)) {
          result += chars.charCodeAt(i) - OFFSET_LATIN_CHARACTER;
        } else {
          result += chars.charAt(i);
        }
      }
      return result;
    }

    function isCapitalLetter(source: string, index = 0) {
      const charCode = source.charCodeAt(index);
      return charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z;
    }
  }
}

export class BankAccount {
  constructor(public customer: Customer, public iban: Iban) {}

  toString(): string {
    return `[${this.iban.format()}] ${this.customer.format()}`;
  }
}

interface BankConfig {
  name: string;
  countryCode: string;
  bankCode: string;
}

class Bank {
  public readonly accounts: BankAccount[] = [];
  constructor(public readonly config: BankConfig) {}

  public createAccount(customer: Customer) {
    const newAccount = new BankAccount(
      customer,
      Iban.generate(this.config.bankCode, this.config.countryCode)
    );
    this.accounts.push(newAccount);
    auditLog(customer, 'assigned');
    console.log(`[${this.config.name}] welcomes ${newAccount}`);
  }
}

const bank = new Bank({
  bankCode: 'TYPE',
  countryCode: 'NL',
  name: 'Typed bank',
});
bank.createAccount(new Customer('Alfred', 'Kwak', 'Jodocus'));
bank.createAccount(new Customer('Brad', 'Pitt'));
bank.createAccount(new Customer('Jack', 'Sparrow'));

interface Formattable {
  format(): string;
}

function auditLog<T extends Formattable>(subject: T, action: string) {
  console.log(`[${subject.format()}]: ${action}`);
}

// #### Exercise 2:

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
