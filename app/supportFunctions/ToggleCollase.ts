import { useState } from "react";

// Custom hook to manage collapse state
export function useCollapse() {
  const [isContentCollapsed, setIsContentCollapsed] = useState(false);

  // Toggle collapse state
  const toggleCollapse = () => {
    setIsContentCollapsed((prev) => !prev);
  };

  return {
    isContentCollapsed,
    toggleCollapse,
  };
}
