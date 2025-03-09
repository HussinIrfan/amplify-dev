/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getIsOpen = /* GraphQL */ `query GetIsOpen($id: ID!) {
  getIsOpen(id: $id) {
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
` as GeneratedQuery<APITypes.GetIsOpenQueryVariables, APITypes.GetIsOpenQuery>;
export const listIsOpens = /* GraphQL */ `query ListIsOpens(
  $filter: ModelIsOpenFilterInput
  $limit: Int
  $nextToken: String
) {
  listIsOpens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListIsOpensQueryVariables,
  APITypes.ListIsOpensQuery
>;
export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const getProductVariant = /* GraphQL */ `query GetProductVariant($id: ID!) {
  getProductVariant(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductVariantQueryVariables,
  APITypes.GetProductVariantQuery
>;
export const listProductVariants = /* GraphQL */ `query ListProductVariants(
  $filter: ModelProductVariantFilterInput
  $limit: Int
  $nextToken: String
) {
  listProductVariants(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      productId
      size
      quantity
      createdAt
      updatedAt
      productVariantsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductVariantsQueryVariables,
  APITypes.ListProductVariantsQuery
>;
