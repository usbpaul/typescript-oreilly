import type { BankAccount } from './bank-account.js';
import type { BankConfig } from './bank-config.js';
import type { Customer } from './customer.js';

export const contextRoot = 'api';

export interface Entities {
  accounts: BankAccount[];
  bank: BankConfig;
  customers: Customer[];
}

export type BankRoute = `/${typeof contextRoot}/${keyof Entities}`;
