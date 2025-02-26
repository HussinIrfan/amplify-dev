'use client';

import React from 'react';
import CustomNavbar from '../customNavbar/CustomNavbar';
import Footer from '../footer/footer';
import CartItem from '../homepage/CartItem';
import styles from './Cart.module.css';

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Firefighter T-Shirt', price: 55.55, quantity: 2, size: '<size>', image: '/firefighter_tshirt.jpg' },
    { id: 2, name: 'Firefighter Hoodie', price: 55.55, quantity: 2, size: '<size>', image: '/firefighter_tshirt.jpg' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <CustomNavbar />

      {/* Main Content */}
      <main className={styles.mainContent}>

          {/* Cart Container */}
      <div className={styles.cartContainer}>
          <div className={styles.cartItemsSection}>
            <h1 className={styles.heading}>Cart</h1>

            {/* Cart Items */}
            <div className={styles.cartHeader}>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Update Button */}
            <div className={styles.updateButtonContainer}>
              <button className={styles.updateButton}>Update</button>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className={styles.cartSummaryContainer}>
            <h2>Cart totals</h2>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Subtotal</span>
              <span className={styles.cartValue}>$66.44</span>
            </div>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Shipping</span>
              <span className={styles.cartValue}>$66.44</span>
            </div>

            {/* Move "Ship to" and "Change Address" to the Right Side */}
              <div className={styles.cartSummaryRightRow}>
                <span className={styles.cartValue}>Ship to &lt;State&gt;</span>
              </div>
              <div className={styles.cartSummaryRightRow}>
                 <span className={styles.cartValue}>Change address</span>
              </div>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Tax</span>
              <span className={styles.cartValue}>$5.23</span>
            </div>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Total</span>
              <span className={styles.cartValue}>$72.38</span>
            </div>
            <button className={styles.checkoutButton}>Proceed to checkout</button>

          </div>
        </div>

       
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;