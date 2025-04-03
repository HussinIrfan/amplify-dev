"use client";

import React from "react";
import styles from "./donations.module.css";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import useDonations from "./DonationsLogic";

export default function Donations() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const { donationOpen, toggleDonationStatus } = useDonations();

  return (
    <div className={styles.div}>
      <h2 className={styles["admin-h2"]} onClick={toggleCollapse}>
        Donations{" "}
        <span
          className={`dropdown-arrow ${
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
        className={`${styles["donations-toggle-container"]} ${
          !isContentCollapsed ? styles.collapsed : styles.expanded
        }`}
      >
        {isContentCollapsed && (
          <button
            onClick={toggleDonationStatus}
            className={`${styles["donations-toggle-btn"]} ${
              donationOpen ? styles.open : styles.closed
            }`}
          >
            {donationOpen ? "✅ Donations Open" : "❌ Donations Closed"}
          </button>
        )}
      </div>
    </div>
  );
}
