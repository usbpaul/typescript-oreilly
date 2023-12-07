import type { Jsonified } from './jsonified.js';

export class Customer {
  constructor(
    public firstName: string,
    public lastName: string,
    public insertion?: string
  ) {}

  public format(): string {
    if (this.insertion) {
      return `${this.firstName} ${this.insertion} ${this.lastName}`;
    } else {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  static fromJson(customerJson: Jsonified<Customer>) {
    return new Customer(
      customerJson.firstName,
      customerJson.lastName,
      customerJson.insertion
    );
  }
}
