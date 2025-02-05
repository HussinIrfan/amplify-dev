'use client';

import React from 'react';
import CartItem from '../components/CartItem';
import styles from './Cart.module.css';

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Firefighter T-Shirt',
      price: 55.55,
      quantity: 2,
      size: '<size>',
      image: '/firefighter_tshirt.jpg',
    },
    {
      id: 2,
      name: 'Firefighter Hoodie',
      price: 55.55,
      quantity: 2,
      size: '<size>',
      image: '/firefighter_tshirt.jpg',
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className={styles.cartContainer}>
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

      <button className={styles.updateButton}>Update</button>

      <div className={styles.cartSummary}>
        <h2>Cart totals</h2>
        <p>
          <span>Subtotal</span> <span>${subtotal.toFixed(2)}</span>
        </p>
        <p>
          <span>Shipping</span> <span>Rate $66.44</span>
        </p>
        <p>
          <span>Tax</span> <span>${tax.toFixed(2)}</span>
        </p>
        <p>
          <span>Total</span> <span>${total.toFixed(2)}</span>
        </p>
        <button className={styles.checkoutButton}>Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
