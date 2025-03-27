import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'SLT-FIRE-STORAGE',
    access: (allow) => ({
        'about-us-founders/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
        'ourWork/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
        'Documents/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
        'fire-stations/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
        'hornors/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
        'eventDetails/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
    })

});

/*
import { defineStorage } from "@aws-amplify/backend";
import { Auth } from 'aws-amplify';

export const storage = defineStorage({
  name: 'SLT-FIRE-STORAGE',
  access: (allow) => ({
    'about-us-founders/*': [
      allow.guest.to(['read']), // Allow guests to read
      allow.authenticated.to(['write', 'delete']), // Only authenticated users can write and delete
    ],
    'ourWork/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['write', 'delete']),
    ],
    'Documents/*': [
      allow.authenticated.to(['read', 'write', 'delete']), 
    ],
    'fire-stations/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
    'hornors/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});
*/