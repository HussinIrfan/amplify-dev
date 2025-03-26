"use client";


import React, { useState, useEffect, useRef } from "react";
import styles from "./donation.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";

import useDonations from "../admin/donations/DonationsLogic";
import Link from "next/link";


// HARDCODED VALUES
const PAYPAL_CLIENT_ID = "AV6VEgDVIukeYpnclfC3XOYUdvd2Tw-pPtPdysoQx5Z_rpPIjTuIeqhQ1mXeW8cVfBJR5A9J1nCeHERA";
const API_URL = "http://localhost:5000"; // Use your backend or ngrok URL in production

declare global {
  interface Window {
    paypal: any;
  }
}

const DonationPage: React.FC = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>("");

  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const { donationOpen, setDonationOpen, toggleDonationStatus } =useDonations();
  useEffect(() => {
    if (paypalLoaded) return;

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&currency=USD`;
    script.async = true;
    script.onload = () => {
      console.log("PayPal SDK loaded");
      setPaypalLoaded(true);
      renderPayPalButtons();
    };
    script.onerror = () => console.error("Failed to load PayPal SDK");
    document.body.appendChild(script);
  }, [paypalLoaded]);

  const createOrder = async () => {
    console.log("createOrder() called");
    const amount = parseFloat(donationAmount as string);
    if (!amount || isNaN(amount) || amount < 1) {
      alert("Please enter a valid donation amount (minimum $1).");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: amount.toFixed(2), currency: "USD" }),
      });

      const text = await response.text();
      console.log("Raw response from /api/orders:", text);

      if (!response.ok) {
        throw new Error(`Backend error: ${text}`);
      }

      const data = JSON.parse(text);
      if (!data.id) {
        throw new Error("No order ID returned by backend");
      }

      return data.id;
    } catch (error) {
      console.error("createOrder error:", error);
      alert("Failed to create PayPal order.");

    }
  };

  const captureOrder = async (orderID: string) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderID}/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert("Donation successful! A receipt has been sent to your PayPal email.");
      } else {
        console.error("Capture failed:", data);
        alert("Payment failed.");
      }
    } catch (error) {
      console.error("captureOrder error:", error);
      alert("There was an error processing your payment.");
    }
  };

  const renderPayPalButtons = () => {
    if (!paypalContainerRef.current) return;

    paypalContainerRef.current.innerHTML = "";

    if (window.paypal) {
      window.paypal.Buttons({
        style: { shape: "rect", layout: "vertical", color: "gold", label: "paypal" },
        createOrder: createOrder,
        onApprove: async (data: { orderID: string }) => {
          if (!data.orderID) {
            alert("No order ID returned");
            return;
          }
          await captureOrder(data.orderID);
        },
        onError: (err: unknown) => {
          console.error("PayPal Checkout Error:", err);
          alert("There was an error processing your payment.");
        },
      }).render(paypalContainerRef.current);
    } else {
      console.error("PayPal SDK not loaded");
    }
  };

  return (
    <div className={styles.donationPage}>

      {donationOpen ? (
        <>
          <CustomNavbar />

          {/* ✅ Hero Section */}
          <section className={styles.hero}>
            <h1 className={styles.heroText}>
              South Lake Tahoe Firefighter's Foundation
            </h1>
            <h2 className={styles.heroSubText}>
              Your support helps provide vital resources
            </h2>

            {/* ✅ Donation Box */}
            <div className={styles.donationOptionsBox}>
              {!showThankYou ? (
                <>
                  {/* ✅ "Donate Now" Title Still Here */}
                  <h2>Donate Now</h2>
                  <p>
                    Thank you for supporting the South Lake Tahoe Firefighter's
                    Foundation. Your donation helps us provide critical
                    resources for our community and first responders.
                  </p>

                  <p>Select or enter an amount</p>
                  <div className={styles.donationOptions}>
                    <button onClick={() => handlePresetDonation(25)}>
                      $25
                    </button>
                    <button onClick={() => handlePresetDonation(50)}>
                      $50
                    </button>
                    <button onClick={() => handlePresetDonation(100)}>
                      $100
                    </button>
                  </div>

                  <input
                    type="number"
                    className={styles.donationInput}
                    placeholder="$"
                    value={donationAmount}
                    onChange={(e) => {
                      const inputAmount = Number(e.target.value);
                      if (
                        !isNaN(inputAmount) &&
                        inputAmount <= MAX_DONATION_AMOUNT
                      ) {
                        setDonationAmount(inputAmount);
                        setErrorMessage(""); // Clear error if input is valid
                      } else {
                        setErrorMessage(
                          `Max donation is $${MAX_DONATION_AMOUNT}.`
                        );
                      }
                    }}
                    max={MAX_DONATION_AMOUNT}
                  />

                  {/* ✅ Inline Error Message */}
                  {errorMessage && (
                    <p className={styles.errorText}>{errorMessage}</p>
                  )}

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
                    <p>
                      Your donation helps provide essential resources for our
                      first responders and the community.
                    </p>
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
      ;

    </div>
  );
};

export default DonationPage;
