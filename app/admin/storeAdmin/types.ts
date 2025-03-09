export interface ProductVariant {
    id: string;
    productId: string;
    size?: string | null; // Allow null and undefined
    quantity: number;
  }
  
  export interface Product {
    id: string;
    name: string;
    description?: string | null; // Allow null
    basePrice: number;
    imageUrl: string;
    slug: string;
    variants: { data: ProductVariant[] }; // Ensure this matches the way Amplify provides data
  }
  
  export interface GraphQLResponse<T> {
    data: T | null;
    errors?: { message: string }[];
  }
  