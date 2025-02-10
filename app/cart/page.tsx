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
    <>
      <CustomNavbar />
      <div className={styles.cartContainer}>
        <div className={styles.cartContentWrapper}>
          <h1 className={styles.heading}>Cart</h1>
          <div className={styles.cartHeader}>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
          </div>

          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className={styles.updateButtonContainer}>
            <button className={styles.updateButton}>Update</button>
          </div>

          <div className={styles.cartSummaryContainer}>
            <h2 className={styles.cartTotalsHeading}>Cart totals</h2>
            <div className={styles.cartSummary}>
              <p>
                <span className={styles.leftColumn}>Subtotal</span>
                <span className={styles.rightColumn}>${subtotal.toFixed(2)}</span>
              </p>
              <p>
                <span className={styles.leftColumn}>Shipping</span>
                <span className={styles.rightColumn}>Rate $66.44</span>
              </p>
              <p className={styles.secondaryText}>
                <span className={styles.rightColumn}>Ship to <strong>Your State</strong></span>
              </p>
              <p className={styles.secondaryText}>
                <span className={styles.rightColumn}>Change address</span>
              </p>
              <p>
                <span className={styles.leftColumn}>Tax</span>
                <span className={styles.rightColumn}>${tax.toFixed(2)}</span>
              </p>
              <p>
                <span className={styles.leftColumn}>Total</span>
                <span className={styles.rightColumn}>${total.toFixed(2)}</span>
              </p>
              <button className={styles.checkoutButton}>Proceed to checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
