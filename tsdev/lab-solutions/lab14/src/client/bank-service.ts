import { BankAccount, Customer, type BankConfig } from '../shared/index.js';

export const bankService = {
  async retrieveBank(): Promise<BankConfig> {
    const response = await fetch('/api/bank');
    return response.json();
  },

  async retrieveBankAccounts(): Promise<BankAccount[]> {
    const response = await fetch('/api/accounts');
    const accounts = await response.json();
    return accounts.map((account: BankAccount) =>
      BankAccount.fromJson(account)
    );
  },

  async addCustomer(customer: Customer): Promise<void> {
    await fetch('api/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
