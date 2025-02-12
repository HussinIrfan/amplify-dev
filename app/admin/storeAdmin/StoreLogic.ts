// store.ts
import { useState } from "react";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

export function useStore() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const [storeOpen, setStoreOpen] = useState(false);

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
