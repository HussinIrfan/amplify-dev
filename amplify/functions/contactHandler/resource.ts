import { defineFunction, secret } from '@aws-amplify/backend';

export const contactHandler = defineFunction({
  entry: './handler.ts',
  environment: {
    MAILERSEND_API_KEY: secret('MAILERSEND_API_KEY') // Use the secret for the MailerSend API key
  }
});