import express from 'express';

import { Bank } from './bank.js';
import { Customer } from '../shared/index.js';

export class BankServer {
  private app;

  constructor(private bank: Bank) {
    this.app = express();
    this.app.use(express.json());
    this.app.use('/api', this.createApiRouter());
  }

  listen() {
    this.app.listen(this.bank.config.port);
    console.log(
      `Bank ${this.bank.config.name} listening on port ${this.bank.config.port}`
    );
  }

  private createApiRouter() {
    const router = express.Router({ caseSensitive: false });
    router.get('/bank', (_, response) => {
      console.log('Requested /api/bank');
      response.json(this.bank.config);
    });
    router.get('/accounts', (_, response) => response.json(this.bank.accounts));
    router.post('/customers', (request, response) => {
      const maybeCustomer = request.body;
      if (this.isValid(maybeCustomer)) {
        this.bank.createAccount(
          new Customer(
            maybeCustomer.firstName,
            maybeCustomer.lastName,
            maybeCustomer.insertion
          )
        );
        response.status(204);
        response.end();
      } else {
        response.status(422);
        response.end('Customer entity invalid');
      }
    });
    return router;
  }

  private isValid(customer: any): boolean {
    if (
      customer &&
      customer.firstName &&
      typeof customer.firstName === 'string' &&
      customer.lastName &&
      typeof customer.lastName === 'string' &&
      (!customer.insertion || typeof customer.insertion === 'string')
    ) {
      return true;
    } else {
      return false;
    }
  }
}
