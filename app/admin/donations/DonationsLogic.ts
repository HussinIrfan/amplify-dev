"use client"

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function useDonations() {

  const [donationOpen, setDonationOpen] = useState<boolean | null>(null);

  const tableID = "1";

  // Fetch store open state from the database on initial load
    useEffect(() => {
      const fetchDonationStatus = async () => {
        try {
          const response = await client.models.isOpen.get({ id: tableID });
          if (response.data != null) {
  
            // Safely extract donations, considering the nullable type
            setDonationOpen(response.data.donations ?? true); // Default to true if null or undefined
          }
          else{
            try {
              const entry = await client.models.isOpen.create({
                id: tableID,
                aboutUS: true,
                ourWork: true,
                calendar: true,
                donations: true,
                contactUs: true,
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
  
      // Real-time subscription to the donations field
      const sub = client.models.isOpen.observeQuery().subscribe({
  
        next: ({ items}) => {
          const currentStoreStatus = items.find(item => item.id === tableID);
          if (currentStoreStatus) {
            setDonationOpen(currentStoreStatus.donations);
          }
        },
        error: (err) => console.error("Error in real-time subscription:", err),
      });
      
      fetchDonationStatus();
       // Cleanup the subscription on unmount
       return () => sub.unsubscribe();
    }, []);

    const toggleDonationStatus = async () => {
        const newStatus = donationOpen !== null ? !donationOpen : true;
        setDonationOpen(newStatus);
    
        try {
          await client.models.isOpen.update({
            id: tableID,
            donations: newStatus
          });
          console.log("Donations status updated to:", newStatus);
        } catch (error) {
          console.error("Error updating Donations status:", error);
        }
      };


      return {
        donationOpen,
        setDonationOpen,
        toggleDonationStatus,
      };
}