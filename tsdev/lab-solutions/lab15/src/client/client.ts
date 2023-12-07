import './bank-accounts-table-component.js';
import './add-customer-component.js';
import { bankService } from './bank-service.js';
import type { Customer } from 'src/shared/customer.js';

const [bankAccounts, bank] = await Promise.all([
  bankService.retrieveBankAccounts(),
  await bankService.retrieveBank(),
]);

document.querySelector('h1')!.textContent = bank.name;

const bankAccountsComponent = document.querySelector('bank-accounts-table')!;
bankAccountsComponent.accounts = bankAccounts;

async function addCustomer(customer: Customer) {
  await bankService.addCustomer(customer);
  bankAccountsComponent.accounts = await bankService.retrieveBankAccounts();
}

document.querySelector('add-customer')!.addEventListener('customer-added', ((
  event: CustomEvent<Customer>
) => {
  addCustomer(event.detail);
}) as EventListener);
