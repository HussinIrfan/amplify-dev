import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Subscriber: a
    .model({
      emailID: a.id(),
      emails: a.string(),
      //customer: a.belongsTo("Customer", "emailID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Products: a
    .model({
      productID: a.id(),
      //category: a.belongsTo("ProductCategory", "productID"),
      name: a.string(),
      price: a.float(),
      description: a.string(),
      size: a.enum(["XS", "S", "M", "L", "XL"]),
      stock: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ProductCategory: a
    .model({
      categoryID: a.id(),
      categoryName: a.string(),
      //products: a.hasMany("Products", "productID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Orders: a
    .model({
      orderID: a.id(),
      //customer: a.belongsTo("Customer", "orderID"),
      orderTotal: a.float(),
      orderDate: a.date(),
      //products: a.hasMany("Products", "productID"), // Link to products in the order
    })
    .authorization((allow) => [allow.publicApiKey()]),

  

  Customer: a
    .model({
      customerID: a.id(),
      //orders: a.hasMany("Orders", "orderID"),
      firstName: a.string(),
      lastName: a.string(),
      phone: a.phone(),
      //email: a.hasOne("Subscriber", "emailID"),
      //shipAddress: a.hasOne("ShipAddress", "customerID"),
      //billingAddress: a.hasOne("BillAddress", "customerID"),
      //payment: a.hasMany("Payment", "customerID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ShipAddress: a
    .model({
      addressID: a.id(),
      //customerID: a.belongsTo("Customer", "customerID"),
      country: a.string(),
      state: a.string(),
      city: a.string(),
      street: a.string(),
      zipCode: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  BillAddress: a
    .model({
      addressID: a.id(),
      //customerID: a.belongsTo("Customer", "customerID"),
      country: a.string(),
      state: a.string(),
      city: a.string(),
      street: a.string(),
      zipCode: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Payment: a
    .model({
      paymentID: a.id(),
      //customerID: a.belongsTo("Customer", "customerID"),
      method: a.enum(["VISA", "MASTERCARD", "DISCOVER", "AMERICAN_EXPRESS"]),
      amount: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Tracking: a
    .model({
      trackingID: a.id(),
      trackingStatus: a.string(),
      //order: a.belongsTo("Orders", "orderID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Cart: a
    .model({
      cartID: a.id(),
      //customer: a.belongsTo("Customer", "customerID"),
      //products: a.hasMany("Products", "productID"),
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

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
