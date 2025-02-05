'use client';

import React from 'react';
import styles from './Checkout.module.css';

const Checkout = () => {
  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.heading}>Checkout</h1>

      <div className={styles.gridContainer}>
        {/* Left Section: Billing Details and Shipping Address */}
        <div>
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

        {/* Right Section: Order Summary and Payment */}
        <div>
          <div className={styles.orderSummary}>
            <h2 className={styles.sectionHeading}>Your Order</h2>
            <div className={styles.orderDetails}>
              <p>
                <span>Item Desc</span>
                <span>Cost of Item</span>
              </p>
              <p>
                <span>Item Desc</span>
                <span>Cost of Item</span>
              </p>
              <p>
                <span>Subtotal</span>
                <span>$85.23</span>
              </p>
              <p>
                <span>Shipping</span>
                <span>$5.23</span>
              </p>
              <p>
                <span>Tax</span>
                <span>$5.23</span>
              </p>
              <p>
                <span>Total</span>
                <span>$72.38</span>
              </p>
            </div>
          </div>

          <div className={styles.paymentSection}>
            <h2 className={styles.sectionHeading}>Payment</h2>
            <form>
              <label>Card Number*</label>
              <input type="text" className={styles.inputField} placeholder="Card Number" />

              <label>Expiration*</label>
              <input type="text" className={styles.inputField} placeholder="MM/YY" />

              <label>CVC*</label>
              <input type="text" className={styles.inputField} placeholder="CVC" />
            </form>

            {/* Place Order Button */}
            <button className={styles.placeOrderButton}>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
