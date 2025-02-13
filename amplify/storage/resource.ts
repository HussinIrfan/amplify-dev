import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'backend-images',
    access: (allow) => ({
        'about-us-founders/*': [
            allow.guest.to(['read', 'write', 'delete']),
        ],
    })

});