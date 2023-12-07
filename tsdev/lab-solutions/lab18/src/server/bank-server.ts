import express from 'express';
import { fileURLToPath } from 'url';

import { Bank } from './bank.js';
import { Customer } from '../shared/index.js';

const resolve = (relativePath: string) =>
  fileURLToPath(new URL(`../../${relativePath}`, import.meta.url));

export class BankServer {
  private app;

  constructor(private bank: Bank) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.static(resolve('static')));
    this.app.use(express.static(resolve('dist')));
    this.app.use('/src', express.static(resolve('src')));
    this.app.use('/api', this.createApiRouter());
    this.app.use('/node_modules', express.static(resolve('node_modules')));
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
      const maybeCustomer: unknown = request.body;
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

  private isValid(customer: unknown): customer is Customer {
    return Boolean(
      customer &&
        typeof customer === 'object' &&
        'firstName' in customer &&
        typeof customer.firstName === 'string' &&
        'lastName' in customer &&
        typeof customer.lastName === 'string' &&
        (!('insertion' in customer) || typeof customer.insertion === 'string')
    );
  }
}
