import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { storage } from './storage/resource';
import { contactHandler } from './functions/contactHandler/resource';
import { paypalHandlerCreate } from './functions/papypalHandlerCreate/resource.js';
import { paypalHandlerCapture } from './functions/paypalHandlerCapture/resource.js';
defineBackend({
  auth,
  data,
  storage,
  contactHandler,
  paypalHandlerCreate,
  paypalHandlerCapture
});
