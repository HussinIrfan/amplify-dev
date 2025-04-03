"use client";

import react, { useState } from "react";
import "./donations.css";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import useDonations from "./DonationsLogic";
// import "../storeAdmin/store.css";

export default function Donations() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();

  const { donationOpen, setDonationOpen, toggleDonationStatus } =
    useDonations();

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
        <div
          className={`collapsible-content ${
            !isContentCollapsed ? "collapsed" : "expanded"
          }`}
        >
          {isContentCollapsed && <>
          {/* Add the button */}
          <button
                onClick={toggleDonationStatus}
                className={`store-toggle-btn ${donationOpen ? "open" : "closed"}`}
              >
                {donationOpen ? "✅ Donations Open" : "❌ Donations Closed"}
              </button>


          </>}
        </div>
      </div>
    </>
  );
}
