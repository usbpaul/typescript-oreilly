import { BankAccount, Customer, type BankConfig } from '../shared/index.js';
import * as http from './http.js';

export const bankService = {
  async retrieveBank(): Promise<BankConfig> {
    return http.get('/api/bank');
  },

  async retrieveBankAccounts(): Promise<BankAccount[]> {
    const bankAccounts = await http.get('/api/accounts');
    return bankAccounts.map((bankAccount) => BankAccount.fromJson(bankAccount));
  },

  async addCustomer(customer: Customer): Promise<void> {
    await http.post('/api/customers', customer);
  },
};
