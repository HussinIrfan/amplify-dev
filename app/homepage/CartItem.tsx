"use client";
import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ item }: { item: { name: string; price: number; quantity: number; image: string; size: string } }) => {
  return (
    <div className={styles.cartItem}>
      <div>
        <img src={item.image} alt={item.name} className={styles.cartImage} />
        <div className={styles.cartDetails}>
          <p className={styles.itemDescription}>{item.name}</p>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className={styles.cartPrice}>${item.price.toFixed(2)}</div>
      <div className={styles.cartQuantity}>
        <input type="number" value={item.quantity} readOnly />
      </div>
      <div className={styles.cartSubtotal}>${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;
