"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";
import EmailList from "./emailList/EmailList";
import WebsiteSettings from "./WebsiteSettings";
import Documents from "./documents/Documents";
import StoreFront from "./storeAdmin/Store";
import ProductList from "./storeAdmin/productList";
import ProductEditForm from "./storeAdmin/editProductForm";
import { useState } from "react";

export default function AdminPage() {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Function to handle cancel action
  const handleCancel = () => {
    setEditingProduct(null); // Reset the editing product state
  };

  return (
    <>
      <div className="admin-config">
        
          <CustomNavbar />
        
        <div>
          <h1 className="admin-h1">Admin Settings</h1>
        </div>
        <WebsiteSettings />
        <EmailList />

        {/* Store Section (This includes the Store On/Off Toggle) */}
        <StoreFront />

        {/* Product Management Section - Nest under Store */}
        <div className="store-admin-section">
          {/* Add Product Button */}
          {!editingProduct && (
            <button onClick={() => setEditingProduct({})} className="add-product-button">
              Add Product
            </button>
          )}

          {/* Show Product List or Edit Form */}
          {!editingProduct ? (
            <ProductList onEdit={setEditingProduct} />
          ) : (
            <ProductEditForm
              product={editingProduct}
              onSave={() => setEditingProduct(null)}
              onCancel={handleCancel} // Pass the onCancel handler
              isNewProduct={!editingProduct.id} // If no ID, it's a new product
            />
          )}
        </div>

        {/* <Documents /> */}
        <StoreFront />

        <br />
        <br />
        <br />
        <br />
      </div> 
    </>
  );
}