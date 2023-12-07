import type { LanguageCode } from './language-code.js';

export interface BankConfig {
  name: string;
  countryCode: string;
  bankCode: string;
  port: number;
  language: LanguageCode;
}
