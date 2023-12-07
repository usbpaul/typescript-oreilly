import { BankAccount } from '../shared/bank-account.js';
import { customElement } from './custom-element.js';
@customElement('bank-accounts-table')
export class BankAccountsTableComponent extends HTMLElement {
  private _accounts: BankAccount[] = [];

  public get accounts(): BankAccount[] {
    return this._accounts;
  }

  public set accounts(value: BankAccount[]) {
    this._accounts = value;
    this.updateTable();
  }

  public updateTable() {
    this.innerHTML = `<table class="table">
        <thead>
            <tr>
                <th>Account</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
        ${this.accounts
          .map(
            (account) =>
              `<tr>
               <td>${account.iban.format()}</td>
               <td> ${account.customer.format()}</td>
               </tr>`
          )
          .join('')}
        </tbody>
        </table>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'bank-accounts-table': BankAccountsTableComponent;
  }
}
