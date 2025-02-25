'use client';

import React, { useEffect } from 'react';
import styles from './Checkout.module.css';
import CustomNavbar from '../customNavbar/CustomNavbar';
import Footer from '../footer/footer';

const PAYPAL_CLIENT_ID = 'AZVlUKD1V6oT6Ym_JWGNGZYW17n-uUdOjiYVTLWtKc6dWfTaI_cnFh0tXzFWDOAhP37OHuRhhLB6Cns7';

declare global {
  interface Window {
    paypal: any;
  }
}

const Checkout = () => {
  useEffect(() => {
    const loadPayPalScript = () => {
      if (!document.querySelector('#paypal-sdk')) {
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
        script.async = true;
        script.onload = renderPayPalButtons;
        document.body.appendChild(script);
      } else {
        renderPayPalButtons();
      }
    };

    const renderPayPalButtons = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            style: {
              shape: 'rect',
              layout: 'vertical',
              color: 'gold',
              label: 'paypal',
            },
            createOrder: async () => {
              const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cart: [{ id: '123', quantity: 1 }],
                }),
              });
              const orderData = await response.json();
              return orderData.id;
            },
            onApprove: async (data: { orderID: string }) => {
              const response = await fetch(`/api/orders/${data.orderID}/capture`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              });

              const orderData = await response.json();
              if (orderData?.purchase_units) {
                alert(`Payment successful! Transaction ID: ${orderData.id}`);
              } else {
                alert('Payment failed.');
              }
            },
            onError: (err: unknown) => {
              console.error('PayPal Checkout Error:', err);
              alert('There was an error processing your payment.');
            },
          })
          .render('#paypal-button-container');
      } else {
        console.error('PayPal SDK failed to load.');
      }
    };

    loadPayPalScript();
  }, []);

  return (
    <div className={styles.checkoutContainer}>
      <CustomNavbar />
      <h1 className={styles.heading}>Checkout</h1>

      <div className={styles.gridContainer}>
        <div>
          {/* Billing Details */}
          <div className={styles.billingDetails}>
            <h2 className={styles.sectionHeading}>Billing Details</h2>
            <form>
              <label>First Name*</label>
              <input type="text" className={styles.inputField} placeholder="First Name" />

              <label>Last Name*</label>
              <input type="text" className={styles.inputField} placeholder="Last Name" />

              <label>Company Name (optional)</label>
              <input type="text" className={styles.inputField} placeholder="Company Name" />

              <label>Country/Region*</label>
              <select className={styles.inputField}>
                <option>United States</option>
                <option>Canada</option>
              </select>

              <label>Street Address*</label>
              <input type="text" className={styles.inputField} placeholder="House number and street name" />
              <input type="text" className={styles.inputField} placeholder="Apartment, suite, unit (optional)" />

              <label>Town/City*</label>
              <input type="text" className={styles.inputField} placeholder="Town/City" />

              <label>State*</label>
              <input type="text" className={styles.inputField} placeholder="State" />

              <label>ZIP Code*</label>
              <input type="text" className={styles.inputField} placeholder="ZIP Code" />

              <label>Phone*</label>
              <input type="text" className={styles.inputField} placeholder="Phone Number" />

              <label>Email*</label>
              <input type="email" className={styles.inputField} placeholder="Email Address" />
            </form>
          </div>

          {/* Different Shipping Address */}
          <div className={styles.differentShippingAddress}>
            <h2 className={styles.sectionHeading}>Different Shipping Address</h2>
            <form>
              <label>First Name*</label>
              <input type="text" className={styles.inputField} placeholder="First Name" />

              <label>Last Name*</label>
              <input type="text" className={styles.inputField} placeholder="Last Name" />

              <label>Company Name (optional)</label>
              <input type="text" className={styles.inputField} placeholder="Company Name" />

              <label>Country/Region*</label>
              <select className={styles.inputField}>
                <option>United States</option>
                <option>Canada</option>
              </select>

              <label>Street Address*</label>
              <input type="text" className={styles.inputField} placeholder="House number and street name" />
              <input type="text" className={styles.inputField} placeholder="Apartment, suite, unit (optional)" />

              <label>Town/City*</label>
              <input type="text" className={styles.inputField} placeholder="Town/City" />

              <label>State*</label>
              <input type="text" className={styles.inputField} placeholder="State" />

              <label>ZIP Code*</label>
              <input type="text" className={styles.inputField} placeholder="ZIP Code" />
            </form>
          </div>
        </div>

        <div>
          {/* Order Summary */}
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionHeading}>Your Order</h2>
            <div className={styles.orderDetails}>
              <p><span>Subtotal</span><span>$85.23</span></p>
              <p><span>Shipping</span><span>$5.23</span></p>
              <p><span>Tax</span><span>$5.23</span></p>
              <p><span>Total</span><span>$95.69</span></p>
            </div>

            <div id="paypal-button-container" style={{ marginTop: '20px' }}></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
