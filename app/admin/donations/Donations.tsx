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
      <div className={styles["admin-h2"]} onClick={toggleCollapse}>
        Donations{" "}
        <span
          className={`${styles["dropdown-arrow"]} ${
            isContentCollapsed ? styles.collapsed : ""
          }`}
        >
          ▼
        </span>
      </div>

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
