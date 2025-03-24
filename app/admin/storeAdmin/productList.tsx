"use client";

import React, { useEffect, useState } from "react";
import "./store.css";
import Image from "next/image";
import useStore from "./StoreLogic";

interface Product {
  id: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  slug: string;
  description?: string | null;
  variants: { id: string; productId: string; size?: string; quantity: number }[];
}

interface ProductListProps {
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEdit }) => {
  const { products, deleteProduct } = useStore();

  // Updated to use local public folder image
  const fallbackImageUrl = "/default_stor_image.jpg"; // Now points to public folder

  const [productsWithUrls, setProductsWithUrls] = useState<Product[]>([]);

  useEffect(() => {
    const updated = products.map((product) => ({
      ...product,
      imageUrl: product.imageUrl || fallbackImageUrl, // Uses the local fallback
    }));
    setProductsWithUrls(updated);
  }, [products]);

  return (
    <div>
      {/* header container */}
      <div className="header-container">
        <div className="product-header">
          <h2>Current Products</h2>
        </div>
        <hr className="divider" />
      </div>

      {/* product list section */}
      <div className="product-list">
        {productsWithUrls.length === 0 ? (
          <p>No products available. Click "Add Product" to create one.</p>
        ) : (
          productsWithUrls.map((product) => (
            <div key={product.id} className="product-item">
              {/* product image */}
              <div className="product-image">
                <Image
                  src={product.imageUrl} // Now relies on the fallback set in useEffect
                  alt={product.name || "No name available"}
                  width={100}
                  height={100}
                  onError={(e) => {
                    // Extra safety net in case the fallback fails
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = fallbackImageUrl;
                  }}
                />
              </div>

              {/* product info */}
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.description ?? undefined}</p>
                <p>Price: ${product.basePrice}</p>

                {/* sizes */}
                {product.variants.length > 0 && (
                  <div className="product-sizes">
                    <strong>Sizes: </strong>
                    {Array.isArray(product.variants) &&
                      product.variants.map((variant) => (
                        <span key={variant.id}>
                          {variant.size} ({variant.quantity})
                        </span>
                      ))}
                  </div>
                )}
              </div>

              {/* actions */}
              <div className="product-actions">
                <button
                  onClick={() =>
                    onEdit({
                      ...product,
                      description: product.description ?? undefined,
                      variants: Array.isArray(product.variants) ? product.variants : [],
                    })
                  }
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
                      deleteProduct(product.id);
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