import React, { useState, useEffect } from "react";
import Image from 'next/image'; 
import "./assets/CartButton.css"; 
import cartIcon from "./assets/cart.png"; 

const AddToCartButton: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
      setCartCount(newCartCount);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <div className="cart_button_container">
      <button className="add_to_cart_btn">
        <Image src={cartIcon} alt="Cart" className="cart_icon" />
        {cartCount > 0 && <span className="cart_count">{cartCount}</span>}
      </button>
    </div>
  );
};

export default AddToCartButton;
