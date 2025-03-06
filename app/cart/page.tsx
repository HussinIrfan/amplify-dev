'use client';

import React, { useEffect, useState } from 'react';
import CustomNavbar from '../customNavbar/CustomNavbar';
import Footer from '../footer/footer';
import CartItem from '../homepage/CartItem';
import styles from './Cart.module.css';
import useStore from '../admin/storeAdmin/StoreLogic';
import { Link } from "@nextui-org/react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  // Admin store setting
    const { storeOpen } = useStore();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      console.log("Cart Items from Local Storage:", parsedCart); // 🔍 Debugging Line
      setCartItems(parsedCart);
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    storeOpen ? (
    <div className={styles.pageContainer}>
      {/* Header */}
      <CustomNavbar />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          <div className={styles.cartItemsSection}>
            <h1 className={styles.heading}>Cart</h1>

            {/* Cart Items Header */}
            <div className={styles.cartHeader}>
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>

            {/* Render Cart Items */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.imageUrl} alt={item.name} className={styles.cartImage} />
                  <div className={styles.cartDetails}>
                    <p className={styles.itemDescription}>{item.name}</p>
                    <p>Size: {item.size ? item.size : "Not Available"}</p> {/* ✅ Ensure Size is Displayed */}
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div className={styles.cartPrice}>${item.price.toFixed(2)}</div>
                  <div className={styles.cartQuantity}>
                    <input type="number" value={item.quantity} readOnly />
                  </div>
                  <div className={styles.cartSubtotal}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}

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
              <span className={styles.cartValue}>${subtotal.toFixed(2)}</span>
            </div>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Tax</span>
              <span className={styles.cartValue}>${tax.toFixed(2)}</span>
            </div>

            <div className={styles.cartSummaryRow}>
              <span className={styles.cartLabel}>Total</span>
              <span className={styles.cartValue}>${total.toFixed(2)}</span>
            </div>

            <button className={styles.checkoutButton}>Proceed to checkout</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  ) : (
    <div className="store-closed-container">
          <h1>Store Closed</h1>
          <p>Sorry, the store is currently closed. Please check back later.</p>
          <Link href="/">Return Home</Link>
        </div>
  )
  );
};

export default CartPage;
