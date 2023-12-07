import {
  BankAccount,
  type BankConfig,
  Customer,
  Iban,
} from '../shared/index.js';
import { auditLog } from './audit-log.js';

const DEFAULT_BANK_CONFIG: Readonly<BankConfig> = Object.freeze({
  port: 8080,
  bankCode: 'TYPE',
  language: 'nl' as const,
  name: 'unknown bank',
  countryCode: 'NL',
});

export class Bank {
  public readonly accounts: BankAccount[] = [];
  public readonly config: Readonly<BankConfig>;
  constructor(config: Partial<BankConfig>) {
    this.config = Object.freeze({ ...DEFAULT_BANK_CONFIG, ...config });
  }

  @auditLog
  public createAccount(customer: Customer) {
    const newAccount = new BankAccount(
      customer,
      Iban.generate(this.config.bankCode, this.config.countryCode)
    );
    this.accounts.push(newAccount);
    console.log(`[${this.config.name}] welcomes ${newAccount}`);
    console.log(this.getGreeting(customer));
  }

  private getGreeting(customerToBeGreeted: Customer): string {
    const name = customerToBeGreeted.format();

    switch (this.config.language) {
      case 'nl':
        return `${this.config.name} verwelkomt ${name}`;
      case 'en':
        return `${this.config.name} welcomes ${name}`;
      case 'fr':
        return `${this.config.name} accueille ${name}`;
      default:
        this.handleUnknownLanguage(this.config.language);
    }
  }

  private handleUnknownLanguage(language: never): never {
    throw new Error(`Language ${language} isn't supported yet.`);
  }
}
