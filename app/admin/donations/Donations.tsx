"use client";

import React from "react";
import styles from "./donations.module.css"; // Using CSS Modules
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import useDonations from "./DonationsLogic";

export default function Donations() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const { donationOpen, setDonationOpen, toggleDonationStatus } = useDonations();

  return (
    <div className={styles.div}>
      <h2 className={styles.adminH2} onClick={toggleCollapse}>
        Donations{" "}
        <span
          className={`${styles.dropdownArrow} ${
            isContentCollapsed ? styles.collapsed : ""
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
      <div
        className={`${styles.collapsibleContent} ${
          !isContentCollapsed ? styles.collapsed : styles.expanded
        }`}
      >
        {isContentCollapsed && (
          <button
            onClick={toggleDonationStatus}
            className={`${styles.storeToggleBtn} ${donationOpen ? styles.open : styles.closed}`}
          >
            {donationOpen ? "✅ Donations Open" : "❌ Donations Closed"}
          </button>
        )}
      </div>
    </div>
  );
}
