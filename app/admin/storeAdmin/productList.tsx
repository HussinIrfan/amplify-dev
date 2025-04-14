"use client";

import React from "react";
import "./store.css";
import Image from "next/image";
import useStore from "./StoreLogic"; // Import the useStore hook

interface Product {
  id: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  slug: string;
  description?: string | null; // Allow null values
  variants: { id: string; productId: string; size?: string; quantity: number }[];
}

interface ProductListProps {
  onEdit: (product: Product) => void; // Explicitly type the `product` parameter
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { products, deleteProduct } = useStore(); 

  return (
    <div>
      {/* Header Container */}
      <div className="header-container">
        <div className="product-header">
          <h2>Current Products</h2>
        </div>

        {/* Horizontal Bar */}
        <hr className="divider" />
      </div>

      {/* Product List Section */}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products available. Click "Add Product" to create one.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-item">
              {/* Product Image */}
              <div className="product-image">
                <Image src={product.imageUrl} alt={product.name} width={100} height={100} />
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.description ?? undefined}</p>
                <p>Price: ${product.basePrice}</p>

                {/* Display sizes if available */}
                {product.variants.length > 0 && (
                  <div className="product-sizes">
                    <strong>Sizes: </strong>
                    {Array.isArray(product.variants) && product.variants.map?.((variant: { id: string; size?: string; quantity: number }) => (
                      <span key={variant.id}>
                        {variant.size} ({variant.quantity})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  onClick={() =>
                    onEdit({
                      ...product,
                      description: product.description ?? undefined, // Convert null to undefined
                      variants: Array.isArray(product.variants) ? product.variants : [],
                    })
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                      deleteProduct(product.id); // call the onDelete function
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;