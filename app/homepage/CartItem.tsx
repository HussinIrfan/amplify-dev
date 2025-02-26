"use client";
import React from 'react';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  return (
    <div className={styles.cartItem}>
      <div>
        {item.image && <img src={item.image} alt={item.name} className={styles.cartImage} />}
        <div className={styles.cartDetails}>
          <p className={styles.itemDescription}>{item.name}</p>
          {item.size && <p>Size: {item.size}</p>}
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
