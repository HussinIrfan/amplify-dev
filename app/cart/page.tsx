'use client';

import React, { useEffect, useState } from 'react';
import CustomNavbar from '../customNavbar/CustomNavbar';
import Footer from '../footer/footer';
import styles from './Cart.module.css';
import useStore from '../admin/storeAdmin/StoreLogic';
import { Link } from "@nextui-org/react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { storeOpen } = useStore(); // Admin store setting

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart).map((item: any) => ({
          id: item.id,
          name: item.name || "Unknown Product",
          price: item.price,
          size: item.size || "N/A",
          quantity: item.quantity || 1,
        }));
        console.log("Cart Items from Local Storage:", parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart:", error);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    storeOpen ? (
    <div className={styles.pageContainer}>
      <CustomNavbar />
      <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          <h1 className={styles.heading}>Cart</h1>

          {/* Cart Headers (for Desktop & Mobile) */}
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
                <div className={styles.cartProduct}>
                  <strong>{item.name}</strong>
                  <p>Size: {item.size}</p>
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

          {/* Update Button Positioned Below Cart Items */}
          <div className={styles.updateButtonContainer}>
            <button className={styles.updateButton}>Update</button>
          </div>

          {/* Cart Totals Section */}
          <div className={styles.cartSummaryContainer}>
            <h2>Cart Totals</h2>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
            <button className={styles.checkoutButton}>Proceed to Checkout</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ) : (
    <div>Store Closed</div>
  )
  );
};

export default CartPage;
