import { Bank } from './bank.js';
import { Customer } from '../shared/index.js';

const bank = new Bank({
  bankCode: 'TYPE',
  countryCode: 'NL',
  name: 'Typed bank',
});
bank.createAccount(new Customer('Alfred', 'Kwak', 'Jodocus'));
bank.createAccount(new Customer('Brad', 'Pitt'));
bank.createAccount(new Customer('Jack', 'Sparrow'));
