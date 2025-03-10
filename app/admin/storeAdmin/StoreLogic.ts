/** TODO Store Open / Close state will be stored in DATABASE once deployed */

"use client"

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function useStore() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();

  const [storeOpen, setStoreOpen] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Array<Schema["Product"]["type"]>>([]);


  const tableID = "1";

  // Fetch store open state from the database on initial load
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const response = await client.models.isOpen.get({ id: tableID });
        if (response.data != null) {

          // Safely extract storeOpen, considering the nullable type
          setStoreOpen(response.data.storeOpen ?? true); // Default to true if null or undefined
        }
        else{
          try {
            const entry = await client.models.isOpen.create({
              id: tableID,
              aboutUS: true,
              ourWork: true,
              news: true,
              calendar: true,
              donations: true,
              storeOpen: true,
            });
          } catch (err) {
            console.error("Error creating entry", err);
          }
        }
      } catch (error) {
        console.error("Error fetching store status:", error);
      }
    };

    // Real-time subscription to the storeOpen field
    const sub = client.models.isOpen.observeQuery().subscribe({

      next: ({ items}) => {
        const currentStoreStatus = items.find(item => item.id === tableID);
        if (currentStoreStatus) {
          setStoreOpen(currentStoreStatus.storeOpen);
        }
      },
      error: (err) => console.error("Error in real-time subscription:", err),
    });
    
    fetchStoreStatus();
     // Cleanup the subscription on unmount
     return () => sub.unsubscribe();
  }, []);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.models.Product.list();
        setProducts(response.data ?? []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
    const sub = client.models.Product.observeQuery().subscribe({
      next: ({ items }) => setProducts(items),
      error: (err) => console.error("❌ Real-time subscription error:", JSON.stringify(err, null, 2)),
    });    

    fetchProducts();
    return () => sub.unsubscribe();
  }, []);

  // Create a new product
  const createProduct = async (productData: Omit<Schema["Product"]["type"], "id">) => {
    try {
      const newProduct = await client.models.Product.create(productData);
      console.log("Product created:", newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Update an existing product
  const updateProduct = async (updatedProduct: Schema["Product"]["type"]) => {
    try {
      await client.models.Product.update(updatedProduct);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete a product
  const deleteProduct = async (productId: string) => {
    try {
      await client.models.Product.delete({ id: productId });
      console.log(`Product with ID ${productId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const toggleStoreStatus = async () => {
    const newStatus = storeOpen !== null ? !storeOpen : true;
    setStoreOpen(newStatus);

    try {
      await client.models.isOpen.update({
        id: tableID,
        storeOpen: newStatus
      });
      console.log("Store status updated to:", newStatus);
    } catch (error) {
      console.error("Error updating store status:", error);
    }
  };

  return {
    tableID,
    isContentCollapsed,
    toggleCollapse,
    storeOpen,
    toggleStoreStatus,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
