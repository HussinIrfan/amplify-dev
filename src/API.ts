/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIsOpenInput = {
  id?: string | null,
  aboutUS?: boolean | null,
  ourWork?: boolean | null,
  news?: boolean | null,
  calendar?: boolean | null,
  donations?: boolean | null,
  storeOpen?: boolean | null,
};

export type ModelIsOpenConditionInput = {
  aboutUS?: ModelBooleanInput | null,
  ourWork?: ModelBooleanInput | null,
  news?: ModelBooleanInput | null,
  calendar?: ModelBooleanInput | null,
  donations?: ModelBooleanInput | null,
  storeOpen?: ModelBooleanInput | null,
  and?: Array< ModelIsOpenConditionInput | null > | null,
  or?: Array< ModelIsOpenConditionInput | null > | null,
  not?: ModelIsOpenConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type isOpen = {
  __typename: "isOpen",
  id: string,
  aboutUS?: boolean | null,
  ourWork?: boolean | null,
  news?: boolean | null,
  calendar?: boolean | null,
  donations?: boolean | null,
  storeOpen?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateIsOpenInput = {
  id: string,
  aboutUS?: boolean | null,
  ourWork?: boolean | null,
  news?: boolean | null,
  calendar?: boolean | null,
  donations?: boolean | null,
  storeOpen?: boolean | null,
};

export type DeleteIsOpenInput = {
  id: string,
};

export type CreateProductInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  basePrice: number,
  imageUrl: string,
  slug: string,
};

export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  basePrice?: ModelFloatInput | null,
  imageUrl?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  description?: string | null,
  basePrice: number,
  imageUrl: string,
  slug: string,
  variants?: ModelProductVariantConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelProductVariantConnection = {
  __typename: "ModelProductVariantConnection",
  items:  Array<ProductVariant | null >,
  nextToken?: string | null,
};

export type ProductVariant = {
  __typename: "ProductVariant",
  id: string,
  productId: string,
  size?: string | null,
  quantity: number,
  product?: Product | null,
  createdAt: string,
  updatedAt: string,
  productVariantsId?: string | null,
};

export type UpdateProductInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  basePrice?: number | null,
  imageUrl?: string | null,
  slug?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreateProductVariantInput = {
  id?: string | null,
  productId: string,
  size?: string | null,
  quantity: number,
  productVariantsId?: string | null,
};

export type ModelProductVariantConditionInput = {
  productId?: ModelIDInput | null,
  size?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  and?: Array< ModelProductVariantConditionInput | null > | null,
  or?: Array< ModelProductVariantConditionInput | null > | null,
  not?: ModelProductVariantConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  productVariantsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateProductVariantInput = {
  id: string,
  productId?: string | null,
  size?: string | null,
  quantity?: number | null,
  productVariantsId?: string | null,
};

export type DeleteProductVariantInput = {
  id: string,
};

export type ModelIsOpenFilterInput = {
  id?: ModelIDInput | null,
  aboutUS?: ModelBooleanInput | null,
  ourWork?: ModelBooleanInput | null,
  news?: ModelBooleanInput | null,
  calendar?: ModelBooleanInput | null,
  donations?: ModelBooleanInput | null,
  storeOpen?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelIsOpenFilterInput | null > | null,
  or?: Array< ModelIsOpenFilterInput | null > | null,
  not?: ModelIsOpenFilterInput | null,
};

export type ModelIsOpenConnection = {
  __typename: "ModelIsOpenConnection",
  items:  Array<isOpen | null >,
  nextToken?: string | null,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  basePrice?: ModelFloatInput | null,
  imageUrl?: ModelStringInput | null,
  slug?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelProductVariantFilterInput = {
  id?: ModelIDInput | null,
  productId?: ModelIDInput | null,
  size?: ModelStringInput | null,
  quantity?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProductVariantFilterInput | null > | null,
  or?: Array< ModelProductVariantFilterInput | null > | null,
  not?: ModelProductVariantFilterInput | null,
  productVariantsId?: ModelIDInput | null,
};

export type ModelSubscriptionIsOpenFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  aboutUS?: ModelSubscriptionBooleanInput | null,
  ourWork?: ModelSubscriptionBooleanInput | null,
  news?: ModelSubscriptionBooleanInput | null,
  calendar?: ModelSubscriptionBooleanInput | null,
  donations?: ModelSubscriptionBooleanInput | null,
  storeOpen?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionIsOpenFilterInput | null > | null,
  or?: Array< ModelSubscriptionIsOpenFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  basePrice?: ModelSubscriptionFloatInput | null,
  imageUrl?: ModelSubscriptionStringInput | null,
  slug?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
  productVariantsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionProductVariantFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  productId?: ModelSubscriptionIDInput | null,
  size?: ModelSubscriptionStringInput | null,
  quantity?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductVariantFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductVariantFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateIsOpenMutationVariables = {
  input: CreateIsOpenInput,
  condition?: ModelIsOpenConditionInput | null,
};

export type CreateIsOpenMutation = {
  createIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateIsOpenMutationVariables = {
  input: UpdateIsOpenInput,
  condition?: ModelIsOpenConditionInput | null,
};

export type UpdateIsOpenMutation = {
  updateIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteIsOpenMutationVariables = {
  input: DeleteIsOpenInput,
  condition?: ModelIsOpenConditionInput | null,
};

export type DeleteIsOpenMutation = {
  deleteIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProductVariantMutationVariables = {
  input: CreateProductVariantInput,
  condition?: ModelProductVariantConditionInput | null,
};

export type CreateProductVariantMutation = {
  createProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type UpdateProductVariantMutationVariables = {
  input: UpdateProductVariantInput,
  condition?: ModelProductVariantConditionInput | null,
};

export type UpdateProductVariantMutation = {
  updateProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type DeleteProductVariantMutationVariables = {
  input: DeleteProductVariantInput,
  condition?: ModelProductVariantConditionInput | null,
};

export type DeleteProductVariantMutation = {
  deleteProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type GetIsOpenQueryVariables = {
  id: string,
};

export type GetIsOpenQuery = {
  getIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListIsOpensQueryVariables = {
  filter?: ModelIsOpenFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIsOpensQuery = {
  listIsOpens?:  {
    __typename: "ModelIsOpenConnection",
    items:  Array< {
      __typename: "isOpen",
      id: string,
      aboutUS?: boolean | null,
      ourWork?: boolean | null,
      news?: boolean | null,
      calendar?: boolean | null,
      donations?: boolean | null,
      storeOpen?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductVariantQueryVariables = {
  id: string,
};

export type GetProductVariantQuery = {
  getProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type ListProductVariantsQueryVariables = {
  filter?: ModelProductVariantFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProductVariantsQuery = {
  listProductVariants?:  {
    __typename: "ModelProductVariantConnection",
    items:  Array< {
      __typename: "ProductVariant",
      id: string,
      productId: string,
      size?: string | null,
      quantity: number,
      createdAt: string,
      updatedAt: string,
      productVariantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateIsOpenSubscriptionVariables = {
  filter?: ModelSubscriptionIsOpenFilterInput | null,
};

export type OnCreateIsOpenSubscription = {
  onCreateIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIsOpenSubscriptionVariables = {
  filter?: ModelSubscriptionIsOpenFilterInput | null,
};

export type OnUpdateIsOpenSubscription = {
  onUpdateIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIsOpenSubscriptionVariables = {
  filter?: ModelSubscriptionIsOpenFilterInput | null,
};

export type OnDeleteIsOpenSubscription = {
  onDeleteIsOpen?:  {
    __typename: "isOpen",
    id: string,
    aboutUS?: boolean | null,
    ourWork?: boolean | null,
    news?: boolean | null,
    calendar?: boolean | null,
    donations?: boolean | null,
    storeOpen?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    description?: string | null,
    basePrice: number,
    imageUrl: string,
    slug: string,
    variants?:  {
      __typename: "ModelProductVariantConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProductVariantSubscriptionVariables = {
  filter?: ModelSubscriptionProductVariantFilterInput | null,
};

export type OnCreateProductVariantSubscription = {
  onCreateProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type OnUpdateProductVariantSubscriptionVariables = {
  filter?: ModelSubscriptionProductVariantFilterInput | null,
};

export type OnUpdateProductVariantSubscription = {
  onUpdateProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};

export type OnDeleteProductVariantSubscriptionVariables = {
  filter?: ModelSubscriptionProductVariantFilterInput | null,
};

export type OnDeleteProductVariantSubscription = {
  onDeleteProductVariant?:  {
    __typename: "ProductVariant",
    id: string,
    productId: string,
    size?: string | null,
    quantity: number,
    product?:  {
      __typename: "Product",
      id: string,
      name: string,
      description?: string | null,
      basePrice: number,
      imageUrl: string,
      slug: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    productVariantsId?: string | null,
  } | null,
};
