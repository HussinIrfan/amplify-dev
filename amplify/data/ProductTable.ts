import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Product: a
    .model({
      name: a.string().required(),
      description: a.string(),
      price: a.float().required(),
      imageUrl: a.string(),
      variants: a.hasMany("ProductVariant", "productId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ProductVariant: a
    .model({
      productId: a.id().required(),
      size: a.string(),
      quantity: a.integer().required(),
      product: a.belongsTo("Product", "productId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
