import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource';
import { contactHandler } from './functions/contactHandler/resource';

defineBackend({
  auth,
  data,
  storage,
  contactHandler,
});
