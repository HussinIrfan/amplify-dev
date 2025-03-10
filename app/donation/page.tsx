'use client';

import React, { useState } from "react";
import styles from "./donation.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar"; 
import Footer from "../footer/footer"; 

const MAX_DONATION_AMOUNT = 5000; // Maximum allowed donation

const DonationPage: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>("");
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handlePresetDonation = (amount: number) => {
    setDonationAmount(amount);
    setErrorMessage(""); // Clear error when selecting a preset amount
  };

  const handleDonation = () => {
    const amount = Number(donationAmount);

    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage("Please enter a valid donation amount.");
      return;
    }

    if (amount > MAX_DONATION_AMOUNT) {
      setErrorMessage(`The maximum donation amount is $${MAX_DONATION_AMOUNT}.`);
      return;
    }

    setShowThankYou(true);
    setErrorMessage(""); // Clear error on successful donation

    // ❌ Removed alert() (no more pop-up)
  };

  return (
    <div className={styles.donationPage}>
      <CustomNavbar />

      {/* ✅ Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroText}>South Lake Tahoe Firefighter's Foundation</h1>
        <h2 className={styles.heroSubText}>Your support helps provide vital resources</h2>

        {/* ✅ Donation Box */}
        <div className={styles.donationOptionsBox}>
          {!showThankYou ? (
            <>
              {/* ✅ "Donate Now" Title Still Here */}
              <h2>Donate Now</h2>
              <p>
                Thank you for supporting the South Lake Tahoe Firefighter's Foundation. 
                Your donation helps us provide critical resources for our community and first responders.
              </p>

              <p>Select or enter an amount</p>
              <div className={styles.donationOptions}>
                <button onClick={() => handlePresetDonation(25)}>$25</button>
                <button onClick={() => handlePresetDonation(50)}>$50</button>
                <button onClick={() => handlePresetDonation(100)}>$100</button>
              </div>

              <input
                type="number"
                className={styles.donationInput}
                placeholder="$"
                value={donationAmount}
                onChange={(e) => {
                  const inputAmount = Number(e.target.value);
                  if (!isNaN(inputAmount) && inputAmount <= MAX_DONATION_AMOUNT) {
                    setDonationAmount(inputAmount);
                    setErrorMessage(""); // Clear error if input is valid
                  } else {
                    setErrorMessage(`Max donation is $${MAX_DONATION_AMOUNT}.`);
                  }
                }}
                max={MAX_DONATION_AMOUNT}
              />

              {/* ✅ Inline Error Message */}
              {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

              <button 
                onClick={handleDonation} 
                className={styles.donateButton}
                disabled={!!errorMessage} // Disable button if there's an error
              >
                Donate
              </button>
            </>
          ) : (
            <>
              {/* ✅ Thank You Message */}
              <div className={styles.thankYouMessage}>
                <h3>Thank You for Your Support!</h3>
                <p>Your donation helps provide essential resources for our first responders and the community.</p>
                <button 
                  onClick={() => setShowThankYou(false)} 
                  className={styles.donateButton}
                >
                  Donate Again
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DonationPage;
