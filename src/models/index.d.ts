import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerisOpen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<isOpen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aboutUS?: boolean | null;
  readonly ourWork?: boolean | null;
  readonly news?: boolean | null;
  readonly calendar?: boolean | null;
  readonly donations?: boolean | null;
  readonly storeOpen?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyisOpen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<isOpen, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly aboutUS?: boolean | null;
  readonly ourWork?: boolean | null;
  readonly news?: boolean | null;
  readonly calendar?: boolean | null;
  readonly donations?: boolean | null;
  readonly storeOpen?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type isOpen = LazyLoading extends LazyLoadingDisabled ? EagerisOpen : LazyisOpen

export declare const isOpen: (new (init: ModelInit<isOpen>) => isOpen) & {
  copyOf(source: isOpen, mutator: (draft: MutableModel<isOpen>) => MutableModel<isOpen> | void): isOpen;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description: string;
  readonly basePrice: number;
  readonly imageUrl: string;
  readonly slug: string;
  readonly variants?: (ProductVariant | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description: string;
  readonly basePrice: number;
  readonly imageUrl: string;
  readonly slug: string;
  readonly variants: AsyncCollection<ProductVariant>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerProductVariant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductVariant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly productId: string;
  readonly size?: string | null;
  readonly quantity: number;
  readonly product?: Product | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productVariantsId?: string | null;
}

type LazyProductVariant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductVariant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly productId: string;
  readonly size?: string | null;
  readonly quantity: number;
  readonly product: AsyncItem<Product | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productVariantsId?: string | null;
}

export declare type ProductVariant = LazyLoading extends LazyLoadingDisabled ? EagerProductVariant : LazyProductVariant

export declare const ProductVariant: (new (init: ModelInit<ProductVariant>) => ProductVariant) & {
  copyOf(source: ProductVariant, mutator: (draft: MutableModel<ProductVariant>) => MutableModel<ProductVariant> | void): ProductVariant;
}