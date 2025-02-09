'use client';

import React, { useState } from "react";
import styles from "./donation.module.css";

const DonationPage: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>(0);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const handlePresetDonation = (amount: number) => {
    setDonationAmount(amount);
  };

  const handleDonation = () => {
    const amount = Number(donationAmount);

    if (amount <= 0 || isNaN(amount)) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setShowThankYou(true);
    alert(`Thank you for your donation of $${donationAmount}`);
  };

  return (
    <div className={styles.donationPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* The image is now handled by the CSS background-image */}
      </section>

      {/* Donation Section */}
      <section className={styles.donationSection}>
        <h1>South Lake Tahoe Firefighter's Foundation</h1>
        <h2 className={styles.donationTitle}>Your support helps provide vital resources</h2>
        <div className={styles.donationOptionsBox}>
          <h2>Donate Now</h2>
          <p>
            Thank you for supporting the South Lake Tahoe Firefighter's Foundation. Your donation helps us provide critical resources for
            our community and first responders.
          </p>

          {!showThankYou ? (
            <div className={styles.donationOptions}>
              <button onClick={() => handlePresetDonation(25)}>$25</button>
              <button onClick={() => handlePresetDonation(50)}>$50</button>
              <button onClick={() => handlePresetDonation(100)}>$100</button>
            </div>
          ) : (
            <div id="thankYouMessage" className={styles.thankYouMessage}>
              <h3>Thank you for your donation!</h3>
              <p>Your support helps the South Lake Tahoe Firefighter's Foundation continue providing critical services to the community. We truly appreciate your generosity.</p>
            </div>
          )}

          {/* Move input field directly below the donation buttons */}
          {!showThankYou && (
            <input
              type="number"
              id="donation-amount"
              placeholder="Enter your donation amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className={styles.donationInput}
            />
          )}

          {!showThankYou && <button onClick={handleDonation} className={styles.donateButton}>Donate</button>}
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
