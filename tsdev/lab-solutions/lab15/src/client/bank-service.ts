import {
  BankAccount,
  Customer,
  type BankConfig,
  type Jsonified,
} from '../shared/index.js';

export const bankService = {
  async retrieveBank(): Promise<BankConfig> {
    const response = await fetch('/api/bank');
    return await (response.json() as Promise<BankConfig>);
  },

  async retrieveBankAccounts(): Promise<BankAccount[]> {
    const response = await fetch('/api/accounts');
    const accounts: Jsonified<BankAccount[]> = await response.json();
    return accounts.map((account) => BankAccount.fromJson(account));
  },

  async addCustomer(customer: Customer): Promise<void> {
    await fetch('api/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
