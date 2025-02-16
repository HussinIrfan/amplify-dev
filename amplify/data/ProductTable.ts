import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Product: a
    .model({
      productId: a.id().required(),
      name: a.string().required(),
      description: a.string(),
      price: a.float().required(),
      imageUrl: a.string(),
      variants: a.hasMany("ProductVariant", "productId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ProductVariant: a
    .model({
      variantId: a.id().required(),
      productId: a.id().required(),
      size: a.string(),
      color: a.string(),
      stock: a.integer().required(),
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
