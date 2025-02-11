import react, { useState } from "react";
import "./donations.css";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";

export default function Donations() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Donations{" "}
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? "collapsed" : ""
            }`}
            style={{
              display: "inline-block",
              marginLeft: "8px",
              transition: "transform 0.3s",
              transform: isContentCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            ▼
          </span>
        </h2>
        {/* Collapsible Section */}
        {isContentCollapsed && <></>}
      </div>
    </>
  );
}
