/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateIsOpen = /* GraphQL */ `subscription OnCreateIsOpen($filter: ModelSubscriptionIsOpenFilterInput) {
  onCreateIsOpen(filter: $filter) {
    id
    aboutUS
    ourWork
    news
    calendar
    donations
    storeOpen
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateIsOpenSubscriptionVariables,
  APITypes.OnCreateIsOpenSubscription
>;
export const onUpdateIsOpen = /* GraphQL */ `subscription OnUpdateIsOpen($filter: ModelSubscriptionIsOpenFilterInput) {
  onUpdateIsOpen(filter: $filter) {
    id
    aboutUS
    ourWork
    news
    calendar
    donations
    storeOpen
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateIsOpenSubscriptionVariables,
  APITypes.OnUpdateIsOpenSubscription
>;
export const onDeleteIsOpen = /* GraphQL */ `subscription OnDeleteIsOpen($filter: ModelSubscriptionIsOpenFilterInput) {
  onDeleteIsOpen(filter: $filter) {
    id
    aboutUS
    ourWork
    news
    calendar
    donations
    storeOpen
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteIsOpenSubscriptionVariables,
  APITypes.OnDeleteIsOpenSubscription
>;
export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
    id
    name
    description
    basePrice
    imageUrl
    slug
    variants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
    id
    name
    description
    basePrice
    imageUrl
    slug
    variants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
    id
    name
    description
    basePrice
    imageUrl
    slug
    variants {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onCreateProductVariant = /* GraphQL */ `subscription OnCreateProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onCreateProductVariant(filter: $filter) {
    id
    productId
    size
    quantity
    product {
      id
      name
      description
      basePrice
      imageUrl
      slug
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    productVariantsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProductVariantSubscriptionVariables,
  APITypes.OnCreateProductVariantSubscription
>;
export const onUpdateProductVariant = /* GraphQL */ `subscription OnUpdateProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onUpdateProductVariant(filter: $filter) {
    id
    productId
    size
    quantity
    product {
      id
      name
      description
      basePrice
      imageUrl
      slug
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    productVariantsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProductVariantSubscriptionVariables,
  APITypes.OnUpdateProductVariantSubscription
>;
export const onDeleteProductVariant = /* GraphQL */ `subscription OnDeleteProductVariant(
  $filter: ModelSubscriptionProductVariantFilterInput
) {
  onDeleteProductVariant(filter: $filter) {
    id
    productId
    size
    quantity
    product {
      id
      name
      description
      basePrice
      imageUrl
      slug
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    productVariantsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProductVariantSubscriptionVariables,
  APITypes.OnDeleteProductVariantSubscription
>;
