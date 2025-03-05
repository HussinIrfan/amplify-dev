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
  const [storeOpen, setStoreOpen] = useState<boolean | null>(null); // Allow null since storeOpen can be nullable
  
  const tableID = "1";

  // Fetch store open state from the database on initial load
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        // Fetch the entry with id "1"
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

  const toggleStoreStatus = async () => {
    const newStatus = storeOpen !== null ? !storeOpen : true; // Handle null state appropriately
    setStoreOpen(newStatus);

    try {
      // Update the store status in the database
      await client.models.isOpen.update({
        id: tableID, // Pass the object with the 'id' property
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
    toggleStoreStatus
  };
}
