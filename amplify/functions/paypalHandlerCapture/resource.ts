import { defineFunction, secret } from '@aws-amplify/backend';

export const paypalHandlerCapture = defineFunction({
  name: 'paypalHandlerCapture ',
  entry: './handler.ts',
  environment: {
    PAYPAL_CLIENT_ID: secret('PAYPAL_CLIENT_ID'), 
    PAYPAL_CLIENT_SECRET: secret('PAYPAL_CLIENT_SECRET')
  }
});