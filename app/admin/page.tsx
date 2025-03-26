"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { getCurrentUser, signOut } from "@aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import CustomNavbar from "../customNavbar/CustomNavbar";
import "../page.module.css";
import "./admin.css";
import EmailList from "./emailList/EmailList";
import WebsiteSettings from "./WebsiteSettings";
import StoreFront from "./storeAdmin/Store";
import ProductList from "./storeAdmin/productList";
import ProductEditForm from "./storeAdmin/editProductForm";

export default function AdminPage() {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  return (
    <Authenticator loginMechanisms={['email']} hideSignUp>
      {({ user }) => {
        return (
          <div className="admin-config">
            <CustomNavbar />
            <div>
              <h1 className="admin-h1">Admin Settings</h1>
            </div>
            <WebsiteSettings />
            <EmailList />
            <StoreFront />

            {/* Product Management Section */}
            <div className="store-admin-section">
              {!editingProduct && (
                <button onClick={() => setEditingProduct({})} className="add-product-button">
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

            <StoreFront />

            {/* Sign Out Button */}
            <button className="signOutButton" onClick={async () => {
              await signOut();
              window.location.reload(); //reload NEEDED, get backend errors when logging out and back in without reload
            }}>
              Sign Out
            </button>
          </div>
        );
      }}
    </Authenticator>
  );


}
