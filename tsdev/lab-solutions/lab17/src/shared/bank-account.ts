import { Iban } from './iban.js';
import { Customer } from './customer.js';
import type { Jsonified } from './jsonified.js';

export class BankAccount {
  constructor(public customer: Customer, public iban: Iban) {}

  toString(): string {
    return `[${this.iban.format()}] ${this.customer.format()}`;
  }

  static fromJson(bankAccount: Jsonified<BankAccount>): BankAccount {
    return new BankAccount(
      Customer.fromJson(bankAccount.customer),
      Iban.fromJson(bankAccount.iban)
    );
  }
}
