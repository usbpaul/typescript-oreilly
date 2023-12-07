import { Iban } from './iban.js';
import { Customer } from './customer.js';

export class BankAccount {
  constructor(public customer: Customer, public iban: Iban) {}

  toString(): string {
    return `[${this.iban.format()}] ${this.customer.format()}`;
  }
}
