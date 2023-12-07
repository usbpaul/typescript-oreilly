import {
  BankAccount,
  type BankConfig,
  Customer,
  Iban,
} from '../shared/index.js';
import { auditLog } from './audit-log.js';

export class Bank {
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
