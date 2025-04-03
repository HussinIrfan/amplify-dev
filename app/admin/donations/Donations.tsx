"use client";

import React from "react";
import "./donations.module.css"; 
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import useDonations from "./DonationsLogic";

export default function Donations() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const { donationOpen, toggleDonationStatus } = useDonations();

  return (
    <div className="div">
      <div className="admin-h2" onClick={toggleCollapse}>
        Donations{" "}
        <span
          className={`dropdown-arrow ${isContentCollapsed ? "collapsed" : ""}`}
          style={{
            display: "inline-block",
            marginLeft: "8px",
            transition: "transform 0.3s",
            transform: isContentCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
          }}
        >
          ▼
        </span>
      </div>

      <div
        className={`collapsible-content ${
          !isContentCollapsed ? "collapsed" : "expanded"
        }`}
      >
        {isContentCollapsed && (
          <button
            onClick={toggleDonationStatus}
            className={`store-toggle-btn ${donationOpen ? "open" : "closed"}`}
          >
            {donationOpen ? "✅ Donations Open" : "❌ Donations Closed"}
          </button>
        )}
      </div>
    </div>
  );
}
