import React from "react";
import Image from 'next/image'; 
import "./assets/AddToCartButton.css"; 
import cartIcon from "./assets/cart.png"; 


const AddToCartButton: React.FC = () => {
  return (
    <button className="add-to-cart-btn">
        <Image src={cartIcon} alt="Cart" className="cart-icon" />
    </button>
  );
};

export default AddToCartButton;
