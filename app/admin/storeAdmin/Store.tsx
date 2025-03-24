"use client";

import React, { useState } from "react";
import "./store.css";
import useStore from "./StoreLogic";
import ProductList from "./productList";
import ProductEditForm from "./editProductForm";

export default function StoreFront() {
  const {
    isContentCollapsed,
    storeOpen,
    toggleCollapse,
    toggleStoreStatus,
  } = useStore();

  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  return (
    <div className="div">
      <h2 className="admin-h2" onClick={toggleCollapse}>
        Store{" "}
        <span
          className={`dropdown-arrow ${isContentCollapsed ? "collapsed" : ""}`}
          style={{
            display: "inline-block",
            marginLeft: "8px",
            transition: "transform 0.3s",
            transform: isContentCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          ▼
        </span>
      </h2>

      <div className={`collapsible-content ${!isContentCollapsed ? "collapsed" : "expanded"}`}>
        {isContentCollapsed && (
          <>
            <button
              onClick={toggleStoreStatus}
              className={`store-toggle-btn ${storeOpen ? "open" : "closed"}`}
            >
              {storeOpen ? "✅ Store is Open" : "❌ Store is Closed"}
            </button>

            {/* Product Management Section - MOVED HERE */}
            <div className="store-admin-section">
              {!editingProduct && (
                <button 
                  onClick={() => setEditingProduct({})} 
                  className="add-product-button"
                  style={{ marginTop: '10px' }}
                >
                  Add Product
                </button>
              )}

              {!editingProduct ? (
                <ProductList onEdit={setEditingProduct} />
              ) : (
                <ProductEditForm
                  product={editingProduct}
                  onSave={() => setEditingProduct(null)}
                  onCancel={() => setEditingProduct(null)}
                  isNewProduct={!editingProduct.id}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}