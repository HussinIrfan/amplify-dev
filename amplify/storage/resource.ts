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
    })

});