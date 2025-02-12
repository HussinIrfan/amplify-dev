// store.ts

/** TODO Store Open / Close state will be stored in DATABASE once deployed */
import { useState } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

export default function useStore() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const [storeOpen, setStoreOpen] = useState(true);

  const toggleStoreStatus = () => {
    setStoreOpen((prevState) => !prevState);
  };

  return {
    isContentCollapsed,
    toggleCollapse,
    storeOpen,
    toggleStoreStatus
  };
}
