'use client';

import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from '../customNavbar/CustomNavbar';
import Footer from '../footer/footer';
import styles from './Cart.module.css';
import useStore from '../admin/storeAdmin/StoreLogic';

// Hardcoded PayPal Live Credentials
const PAYPAL_CLIENT_ID = "AV6VEgDVIukeYpnclfC3XOYUdvd2Tw-pPtPdysoQx5Z_rpPIjTuIeqhQ1mXeW8cVfBJR5A9J1nCeHERA";

// Hardcoded API URL (Replace this with your ngrok URL if testing locally)
const API_URL = "https://randomname.ngrok.io";  // Update this if your backend changes

declare global {
  interface Window {
    paypal: any;
  }
}

const CartPage = () => {
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { storeOpen } = useStore();
  const [isMounted, setIsMounted] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error(" Error parsing cart:", error);
      }
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  let total = subtotal + tax;

  if (total <= 0) {
    total = 1.00;
  }

  useEffect(() => {
    if (!isMounted || paypalLoaded) return;

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    script.onload = () => {
      setPaypalLoaded(true);
      renderPayPalButtons();
    };
    document.body.appendChild(script);
  }, [isMounted, paypalLoaded]);

  const createOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalAmount: total.toFixed(2), currency: "USD" }),
      });

      if (!response.ok) throw new Error("Failed to create order");
      const orderData = await response.json();
      return orderData.id;
    } catch (error) {
      console.error(" Error creating order:", error);
      alert("Failed to create PayPal order.");
    }
  };

  const captureOrder = async (orderID: string) => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderID}/capture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const orderData = await response.json();
      if (orderData.success) {
        alert(` Payment successful! Transaction ID: ${orderData.data.id}`);
      } else {
        alert(" Payment failed.");
      }
    } catch (error) {
      console.error(" Error capturing payment:", error);
      alert("There was an error processing your payment.");
    }
  };

  const renderPayPalButtons = () => {
    if (!paypalContainerRef.current) return setTimeout(renderPayPalButtons, 1000);

    paypalContainerRef.current.innerHTML = "";
    if (window.paypal) {
      window.paypal
        .Buttons({
          createOrder,
          onApprove: async (data: { orderID: string }) => {
            await captureOrder(data.orderID);
          },
          onError: (err: unknown) => {
            console.error('PayPal Checkout Error:', err);
            alert('There was an error processing your payment.');
          },
        })
        .render(paypalContainerRef.current);
    }
  };

  return storeOpen ? (
    <div className={styles.pageContainer}>
      <CustomNavbar />
      <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          <h1 className={styles.heading}>Cart</h1>

          {cartItems.length > 0 ? (
            <>
              <div className={styles.cartSummaryContainer}>
                <h2>Cart Totals</h2>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>

                <div ref={paypalContainerRef} id="paypal-button-container"></div>
              </div>
            </>
          ) : (
            <>
              <p style={{ textAlign: 'center', fontSize: '18px', color: 'red' }}>
                Your cart is empty. But you can still donate!
              </p>
              <div ref={paypalContainerRef} id="paypal-button-container"></div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  ) : <div>Store Closed</div>;
};

export default CartPage;
