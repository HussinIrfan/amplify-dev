'use client';

import React, { useState } from 'react';
import styles from './DonationSummary.module.css'; // Importing the CSS module
import CustomNavbar from "../customNavbar/CustomNavbar"; 
import Footer from "../footer/footer"; 

const DonationSummary: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>(50);
  const [coverFees, setCoverFees] = useState<boolean>(false);
  const [inHonor, setInHonor] = useState<string>('');
  const [anonymous, setAnonymous] = useState<boolean>(false);

  const handleDonationSubmit = () => {
    alert('Donation submitted!');
    // Implement any form submission logic here
  };

  return (
    <div className={styles.donationSummaryPage}>
      {/* Navbar Section */}
      <CustomNavbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <img src="/donation.jpg" alt="Firefighter Foundation" className={styles.heroImage} />
      </section>

      {/* Donation Summary Section */}
      <section className={styles.donationSummarySection}>
        <h1>Donation Summary</h1>

        {/* Payment Summary */}
        <div className={styles.paymentSummary}>
          <h2>Payment Summary</h2>
          <p>Donation Amount: ${donationAmount}</p>
          <label>
            <input
              type="checkbox"
              checked={coverFees}
              onChange={() => setCoverFees(!coverFees)}
            />{' '}
            Would you like to add an additional $5 to cover transaction fees?
          </label><br />
          <label>In honor of:</label><br />
          <input
            type="text"
            value={inHonor}
            onChange={(e) => setInHonor(e.target.value)}
            placeholder="Name"
          /><br />
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />{' '}
            I would like to remain anonymous
          </label>
        </div>

        {/* Billing Info Section */}
        <div className={styles.billingInfo}>
          <h2>Billing Info</h2>
          <div className={styles.paymentMethod}>
            <label htmlFor="debit-card">Debit Card</label>
            <input type="radio" name="payment-method" id="debit-card" />
            <label htmlFor="credit-card">Credit Card</label>
            <input type="radio" name="payment-method" id="credit-card" />
          </div>

          <input type="text" placeholder="First Name" /><br />
          <input type="text" placeholder="Last Name" /><br />
          <input type="text" placeholder="Street Address" /><br />
          <input type="text" placeholder="Apartment, suite, unit (optional)" /><br />
          <input type="text" placeholder="Town / City" /><br />
          <input type="text" placeholder="State" /><br />
          <input type="text" placeholder="ZIP Code" /><br />
          <input type="text" placeholder="Phone Number" /><br />
          <input type="email" placeholder="Email Address" /><br />
          <input type="text" placeholder="Card Number" /><br />

          <button onClick={handleDonationSubmit}>Donate</button>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default DonationSummary;
