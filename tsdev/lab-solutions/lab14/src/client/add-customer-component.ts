import { Customer } from '../shared/index.js';

export class AddCustomerComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = `<form class="form" name="customer">
         <div class="form-group">
             <label for="firstNameInput">First name</label>
             <input id="firstNameInput" name="firstName" type="text" class="form-control">
         </div>
         <div class="form-group">
             <label for="lastNameInput">Last name</label>
             <input id="lastNameInput" name="lastName" type="text" class="form-control">
         </div>
         <div class="form-group">
             <label for="insertionInput">Insertion</label>
             <input id="insertionInput" name="insertion" type="text" class="form-control">
         </div>
         <button type="submit" class="btn btn-primary">Add</button>
     </form>`;
    this.form.addEventListener('submit', (event) => this.submit(event));
  }

  private submit(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    const addCustomerEvent = new CustomEvent('customer-added', {
      detail: new Customer(
        this.form.firstName.value,
        this.form.lastName.value,
        this.form.insertion.value
      ),
    });
    this.dispatchEvent(addCustomerEvent);
  }

  private get form(): HTMLFormElement {
    return this.querySelector('form')!;
  }
}
customElements.define('add-customer', AddCustomerComponent);

declare global {
  interface HTMLElementTagNameMap {
    'add-customer': AddCustomerComponent;
  }
}
