import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { contactHandler } from '../functions/contactHandler/resource';

const schema = a.schema({
  sendContactEmail: a
  .query()
  .arguments({
    firstName: a.string(),
    lastName: a.string(),
    email: a.string(),
    phone: a.string(), // Phone is optional
    subject: a.string(),
    message: a.string(),
  })
  .returns(a.string()) // Returning a simple string instead of an object
  .authorization((allow) => [allow.publicApiKey()])
  .handler(a.handler.function(contactHandler)),

  isOpen: a
    .model({
      aboutUS: a.boolean(),
      ourWork: a.boolean(),
      calendar: a.boolean(),
      donations: a.boolean(),
      storeOpen: a.boolean(),
      contactUs: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  documents: a
    .model({
      doc501c3: a.string(),
      doc990: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

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
      eventDoc: a.string(),
      attendents: a.hasMany("EventAttentants", "eventId"), // Link to attendees
      sponsors: a.hasMany("EventSponsors", "eventId"), // Link to sponsors for this event
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Attendee: a
    .model({
      nameFirst: a.string(),
      nameLast: a.string(),
      phoneNumber: a.string(),
      email: a.email(),
      partySize: a.integer(),
      events: a.hasMany("EventAttentants", "attendeeId"), // Link to events attended
      sponsoredEvents: a.hasMany("EventSponsors", "attendeeId"), // Link to events sponsored by this attendee
    })
    .authorization((allow) => [allow.publicApiKey()]),

  EventAttentants: a
    .model({
      eventId: a.id().required(),
      attendeeId: a.id().required(),
      event: a.belongsTo("Event", "eventId"),
      attendee: a.belongsTo("Attendee", "attendeeId"),
      isSponsor: a.boolean().default(false), // Flag to indicate if this attendee is a sponsor for this event
    })
    .authorization((allow) => [allow.publicApiKey()]),

  EventSponsors: a
    .model({
      eventId: a.id().required(), // ID of the event the attendee sponsors
      attendeeId: a.id().required(), // ID of the attendee who is sponsoring the event
      event: a.belongsTo("Event", "eventId"), // Link to Event
      attendee: a.belongsTo("Attendee", "attendeeId"), // Link to Attendee
      supportDetails: a.string(), // Support or contribution details (optional)
    })
  .authorization((allow) => [allow.publicApiKey()]),

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
      stationName: a.string().required(), // Fire station name
      address: a.string(), // Address of fire station
      phone: a.string(), // Contact number
      image: a.string(), // Image URL for fire station
    })
    .authorization((allow) => [allow.publicApiKey()]),

  // (About Us) Honors Table (Firefighter of the Month/Year)
  Honor: a
    .model({
      title: a.string().required(), // Honor title (e.g., "Firefighter of the Year")
      description: a.string(), // Description of the award
      recipientName: a.string().required(), // Name of firefighter honored
      dateAwarded: a.date().required(), // Date of honor
      recipientImage: a.string(), // Image of honored firefighter
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
