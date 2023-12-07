import * as typedHtml from '../../node_modules/typed-html/dist/esm/src/elements.js';
import { Customer } from '../shared/index.js';
import { customElement } from './custom-element.js';

@customElement('add-customer')
export class AddCustomerComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = (
      <form class="form" name="customer">
        <div class="form-group">
          <label for="firstNameInput">First name</label>
          <input
            id="firstNameInput"
            name="firstName"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="lastNameInput">Last name</label>
          <input
            id="lastNameInput"
            name="lastName"
            type="text"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="insertionInput">Insertion</label>
          <input
            id="insertionInput"
            name="insertion"
            type="text"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Add
        </button>
      </form>
    );
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
    this.form.reset();
  }

  private get form(): HTMLFormElement {
    return this.querySelector('form')!;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'add-customer': AddCustomerComponent;
  }
}
