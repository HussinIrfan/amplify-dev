/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createIsOpen = /* GraphQL */ `mutation CreateIsOpen(
  $input: CreateIsOpenInput!
  $condition: ModelIsOpenConditionInput
) {
  createIsOpen(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateIsOpenMutationVariables,
  APITypes.CreateIsOpenMutation
>;
export const updateIsOpen = /* GraphQL */ `mutation UpdateIsOpen(
  $input: UpdateIsOpenInput!
  $condition: ModelIsOpenConditionInput
) {
  updateIsOpen(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateIsOpenMutationVariables,
  APITypes.UpdateIsOpenMutation
>;
export const deleteIsOpen = /* GraphQL */ `mutation DeleteIsOpen(
  $input: DeleteIsOpenInput!
  $condition: ModelIsOpenConditionInput
) {
  deleteIsOpen(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteIsOpenMutationVariables,
  APITypes.DeleteIsOpenMutation
>;
export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createProductVariant = /* GraphQL */ `mutation CreateProductVariant(
  $input: CreateProductVariantInput!
  $condition: ModelProductVariantConditionInput
) {
  createProductVariant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProductVariantMutationVariables,
  APITypes.CreateProductVariantMutation
>;
export const updateProductVariant = /* GraphQL */ `mutation UpdateProductVariant(
  $input: UpdateProductVariantInput!
  $condition: ModelProductVariantConditionInput
) {
  updateProductVariant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProductVariantMutationVariables,
  APITypes.UpdateProductVariantMutation
>;
export const deleteProductVariant = /* GraphQL */ `mutation DeleteProductVariant(
  $input: DeleteProductVariantInput!
  $condition: ModelProductVariantConditionInput
) {
  deleteProductVariant(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProductVariantMutationVariables,
  APITypes.DeleteProductVariantMutation
>;
