// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { isOpen, Product, ProductVariant } = initSchema(schema);

export {
  isOpen,
  Product,
  ProductVariant
};