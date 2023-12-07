const CHAR_CODE_A = 'A'.charCodeAt(0);
const CHAR_CODE_Z = 'Z'.charCodeAt(0);
const OFFSET_LATIN_CHARACTER = 55;

export class Iban {
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
    return new Iban(countryCode, bankCode, accountNumber, controlNumber());

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

  static fromJson(iban: Iban): Iban {
    return new Iban(
      iban.countryCode,
      iban.bankCode,
      iban.accountNumber,
      iban.controlNumber
    );
  }
}
