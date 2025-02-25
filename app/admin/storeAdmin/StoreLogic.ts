// store.ts

/** TODO Store Open / Close state will be stored in DATABASE once deployed */

"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

const client = generateClient<Schema>();

export default function useStore() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const [storeOpen, setStoreOpen] = useState(true);

  const toggleStoreStatus = () => {
    setStoreOpen((prevState) => !prevState);
  };

 const handleCreateitem = async () => {
  /*try{
    const newRec = await client.models.isOpen.create({storeOpen: storeOpen,});
  }
    */
 }

  return {
    isContentCollapsed,
    toggleCollapse,
    storeOpen,
    toggleStoreStatus
  };
}
