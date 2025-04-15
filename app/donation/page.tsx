"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./donation.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import useDonations from "../admin/donations/DonationsLogic";
import Link from "next/link";
// PayPal Credentials
const PAYPAL_CLIENT_ID = "AV6VEgDVIukeYpnclfC3XOYUdvd2Tw-pPtPdysoQx5Z_rpPIjTuIeqhQ1mXeW8cVfBJR5A9J1nCeHERA";
const API_URL = "http://localhost:5000"; // Replace with your real backend

declare global {
  interface Window {
    paypal: any;
  }
}

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState<number>(1);
  const [coverFee, setCoverFee] = useState<boolean>(false); // New state for checkbox
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const { donationOpen, setDonationOpen, toggleDonationStatus } = useDonations();
  const DONATION_AMOUNT = 10.00;
  const feePercentage = 0.03; // For example, 3% fee
  const fixedFee = 0.30; // If you want to add a fixed fee
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || paypalLoaded) return;

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
      renderPayPalButtons();
    };
    document.body.appendChild(script);
  }, [isMounted, paypalLoaded]);

  useEffect(() => {
    if (!paypalLoaded) return; // Only run if PayPal has been loaded
  
    renderPayPalButtons(); // Re-render PayPal buttons whenever donationAmount changes
  }, [donationAmount]); // Dependency on `donationAmount` to trigger re-render



  const createOrder = async () => {
    try {
      console.log("ammount:", donationAmount)
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: parseFloat(donationAmount.toString()), currency: "USD" }),
      });

      if (!response.ok) throw new Error("Failed to create order");
      const orderData = await response.json();
      return orderData.id;
    } catch (error) {
      console.error("Error creating donation order:", error);
      alert("Failed to start the donation process.");
    }
  };

  const captureOrder = async (orderID: string) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderID}/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const orderData = await response.json();
      if (orderData.success) {
        alert(`Thank you for your donation!`);
      } else {
        alert("Donation payment failed.");
      }
    } catch (error) {
      console.error("Error capturing donation payment:", error);
      alert("There was an error processing your donation.");
    }
  };

  const renderPayPalButtons = () => {
    if (!paypalContainerRef.current) {
      return setTimeout(renderPayPalButtons, 1000);
    }

    paypalContainerRef.current.innerHTML = "";
    if (window.paypal) {
      window.paypal
        .Buttons({
          style: {
            layout: 'vertical'
          },
          createOrder,
          onApprove: async (data: { orderID: string }) => {
            await captureOrder(data.orderID);
          },
          onError: (err: unknown) => {
            console.error('PayPal Donation Error:', err);
            alert('There was an error processing your donation.');
          },
        })
        .render(paypalContainerRef.current);
    }
  };
  const updateDonationAmount = (amount: number, coverFee: boolean) => {
    let newAmount = amount;
    if (coverFee) {
      newAmount = amount * (1 + feePercentage) + fixedFee; // Add fee
    }
    return parseFloat(newAmount.toFixed(2)); // Convert back to number after rounding
  };
  useEffect(() => {
    // Update the donation amount when the checkbox is checked/unchecked
    setDonationAmount(updateDonationAmount(donationAmount, coverFee));
  }, [coverFee]); // Run whenever the checkbox state changes
  return (
    
    <div className={styles.donationPage}>
     {donationOpen ? (
      <>
      <CustomNavbar />
      <section className={styles.hero}>
        <h1 className={styles.heroText}>South Lake Tahoe Firefighter's Foundation</h1>
        <h2 className={styles.heroSubText}>Your support helps provide vital resources</h2>

        <div className={styles.donationOptionsBox}>
          <h2>Donate Now</h2>
          <p>Enter an amount</p>

          <input
            type="number"
            className={styles.donationInput}
            placeholder="$"
            value={donationAmount}
            onChange={(e) =>
              setDonationAmount(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))
            }
          />
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="coverFee"
              checked={coverFee}
              onChange={(e) => setCoverFee(e.target.checked)} // Update state on change
            />
            <label htmlFor="coverFee">Would you like to cover the PayPal transaction fee?</label>
          </div>
          <div ref={paypalContainerRef} id="paypal-button-container"></div>
        </div>
      </section>
      <Footer />
      </>
      ) : (
        <>
          <div className="store-closed-container">
            <h1>Donations Closed</h1>
            <p>
              Sorry, the Donation Page is currently closed. Please check back later.
            </p>
            <Link href="/">Return Home</Link>
          </div>
        </>
      )}
      
    </div>
  );
};
export default DonatePage;