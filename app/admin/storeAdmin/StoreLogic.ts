/** TODO Store Open / Close state will be stored in DATABASE once deployed */

"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

const client = generateClient<Schema>();

export default function useStore() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const [storeOpen, setStoreOpen] = useState<boolean | null>(null); // Allow null since storeOpen can be nullable

  // Fetch store open state from the database on initial load
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        // Fetch the entry with id "1"
        const response = await client.models.isOpen.get({ id: "1" });
        if (response.data) {
          // Safely extract storeOpen, considering the nullable type
          setStoreOpen(response.data.storeOpen ?? true); // Default to true if null or undefined
        }
      } catch (error) {
        console.error("Error fetching store status:", error);
      }
    };
    
    fetchStoreStatus();
  }, []);

  const toggleStoreStatus = async () => {
    const newStatus = storeOpen !== null ? !storeOpen : true; // Handle null state appropriately
    setStoreOpen(newStatus);

    try {
      // Update the store status in the database
      await client.models.isOpen.update({
        id: "1", // Pass the object with the 'id' property
        storeOpen: newStatus
      });
      console.log("Store status updated to:", newStatus);
    } catch (error) {
      console.error("Error updating store status:", error);
    }
  };

  return {
    isContentCollapsed,
    toggleCollapse,
    storeOpen,
    toggleStoreStatus
  };
}
