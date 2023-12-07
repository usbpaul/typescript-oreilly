import { Bank } from './bank.js';
import { Customer } from '../shared/index.js';
import { BankServer } from './bank-server.js';

const bank = new Bank({
  bankCode: 'TYPE',
  countryCode: 'NL',
  name: 'Typed bank',
  port: 8080,
});
bank.createAccount(new Customer('Alfred', 'Kwak', 'Jodocus'));
bank.createAccount(new Customer('Brad', 'Pitt'));
bank.createAccount(new Customer('Jack', 'Sparrow'));
const bankServer = new BankServer(bank);
bankServer.listen();
