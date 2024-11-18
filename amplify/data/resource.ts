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
      emails: a.email(),
      //customer: a.belongsTo("User", "emailID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Products: a
    .model({
      productID: a.id(),
      category: a.belongsTo("ProductCategory", "productID"),
      name: a.string(),
      price: a.float(),
      description: a.string(),
      size: a.enum(["XS", "S", "M", "L", "XL"]),
      stock: a.integer(),
      carts: a.hasMany("CartProducts", "productID"),
      orders: a.hasMany("OrderProducts", "productID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ProductCategory: a
    .model({
      categoryID: a.id(),
      categoryName: a.string(),
      products: a.hasMany("Products", "productID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Orders: a
    .model({
      orderID: a.id(),
      trackingID: a.hasOne("Tracking", "trackingID"),
      customer: a.belongsTo("Customer", "orderID"),
      orderTotal: a.float(),
      orderDate: a.date(),
      products: a.hasMany("OrderProducts", "orderID"), // Link to products in the order
    })
    .authorization((allow) => [allow.publicApiKey()]),

  OrderProducts: a
  .model({
    orderProductID: a.id(),
    orderID: a.id().required(),
    productID: a.id().required(),
    order: a.belongsTo("Orders", "orderID"),
    product: a.belongsTo("Products", "productID"),
    quantity: a.integer(),
    price: a.float(),

  }).authorization((allow) => [allow.publicApiKey()]),

  User: a
  .model({
    userID: a.id(),
    customerID: a.hasOne("Customer", "customerID"),
    firstName: a.string(),
    lastName: a.string(),
    phone: a.phone(),
    email: a.email(),//a.hasOne("Subscriber", "emailID"),
    events: a.belongsTo("Event", "userID"),
    password: a.string(),
    role: a.string(),

  }).authorization((allow) => [allow.publicApiKey()]),

  Customer: a
    .model({
      customerID: a.id(),
      user: a.belongsTo("User", "customerID"),
      orders: a.hasMany("Orders", "orderID"),
      shipAddress: a.hasOne("ShipAddress", "sAddressID"),
      billingAddress: a.hasOne("BillAddress", "bAddressID"),
      payment: a.hasOne("Payment", "paymentID"),
      cart: a.hasOne("Cart", "cartID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  ShipAddress: a
    .model({
      sAddressID: a.id(),
      customerID: a.belongsTo("Customer", "sAddressID"),
      country: a.string(),
      state: a.string(),
      city: a.string(),
      street: a.string(),
      zipCode: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  BillAddress: a
    .model({
      bAddressID: a.id(),
      customerID: a.belongsTo("Customer", "bAddressID"),
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
      customerID: a.belongsTo("Customer", "paymentID"),
      method: a.enum(["VISA", "MASTERCARD", "DISCOVER", "AMERICAN_EXPRESS"]),
      amount: a.float(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Tracking: a
    .model({
      trackingID: a.id(),
      trackingStatus: a.string(),
      order: a.belongsTo("Orders", "trackingID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Cart: a
    .model({
      cartID: a.id(),
      customer: a.belongsTo("Customer", "cartID"),
      products: a.hasMany("CartProducts", "cartID"),
      cost: a.float(),
      totalCount: a.integer(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

    CartProducts: a
    .model({
      cartID: a.id().required(),
      productID: a.id().required(),
      cart: a.belongsTo("Cart", "cartID"),  
      product: a.belongsTo("Products", "productID"),
      itemCount: a.integer(),
      
    })
    .authorization((allow) => [allow.publicApiKey()]),

    //Calendar tables

    Event: a
    .model({
      eventID: a.id(),
      eventTitle: a.string(),
      eventDate: a.date(),
      eventTime: a.time(),
      eventLocation: a.string(),
      eventDetails: a.string(),
      addentees: a.hasMany("User", "userID"),

    })
    .authorization((allow) => [allow.publicApiKey()]),

    aboutUs: a
    .model({
      aboutID: a.id(),
      picture: a.string(),
      name: a.string(),
      row: a.string(),
      description: a.string(),

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
