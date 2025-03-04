import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  isOpen: a
  .model({
    aboutUS: a.boolean(),
    ourWork: a.boolean(),
    news: a.boolean(),
    calendar: a.boolean(),
    donations: a.boolean(),
    storeOpen: a.boolean(),
  }).authorization((allow) => [allow.publicApiKey()]),

  documents: a
  .model({
    doc501c3: a.string(),
    doc990: a.string(),
  }).authorization((allow) => [allow.publicApiKey()]),

  Subscribers: a
    .model({
      email: a.email(),
      //customer: a.belongsTo("User", "emailID"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

     //Calendar tables

     Event: a
     .model({
       eventTitle: a.string(),
       eventStartDate: a.date(),
       eventEndDate: a.date(),
       eventStartTime: a.time(),
       eventEndTime: a.time(),
       eventLocation: a.string(),
       eventDetails: a.string(),
       allday: a.boolean(),
       attendents: a.hasMany('EventAttentants', 'eventId'),
 
     })
     .authorization((allow) => [allow.publicApiKey()]),
 
     Attendee: a
     .model({
       nameFirst: a.string(),
       nameLast: a.string(),
       phoneNumber: a.string(),
       email: a.email(),
       partySize: a.integer(),
       events: a.hasMany('EventAttentants', 'attendeeId'),
 
     }).authorization((allow) => [allow.publicApiKey()]),
 
     EventAttentants: a
     .model({
       eventId: a.id().required(),
       attendeeId: a.id().required(),
       event: a.belongsTo('Event', 'eventId'),
       attendee: a.belongsTo('Attendee', 'attendeeId'),
 
     }).authorization((allow) => [allow.publicApiKey()]),

    aboutUs: a
    .model({
      picture: a.string(),
      name: a.string(),
      title: a.string(),
      description: a.string(),

    })
    .authorization((allow) => [allow.publicApiKey()]),

  // (About Us) Fire Stations Table
  FireStation: a
    .model({
      stationName: a.string().required(),     // Fire station name
      address: a.string(),                    // Address of fire station
      phone: a.string(),                      // Contact number
      image: a.string(),                      // Image URL for fire station
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // (About Us) Honors Table (Firefighter of the Month/Year)
  Honor: a
    .model({
      title: a.string().required(),          // Honor title (e.g., "Firefighter of the Year")
      description: a.string(),               // Description of the award
      recipientName: a.string().required(),  // Name of firefighter honored
      dateAwarded: a.date().required(),      // Date of honor
      recipientImage: a.string(),            // Image of honored firefighter
    })
    .authorization((allow) => [allow.publicApiKey()]),


    ourWork: a
    .model({
      picture: a.string(),
      business: a.string(),
      description: a.string(),

    })
    .authorization((allow) => [allow.publicApiKey()]),


    Product: a
    .model({
      name: a.string().required(),
      description: a.string(),
      basePrice: a.float().required(),
      imageUrl: a.string().required(),
      slug: a.string().required(),
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