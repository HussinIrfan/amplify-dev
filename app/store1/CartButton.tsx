import React from "react";
import Image from 'next/image'; 
import "./assets/AddToCartButton.css"; 
import cartIcon from "./assets/cart.png"; 


const AddToCartButton: React.FC = () => {

  // window.location.href = "/cart";
  
  return (
    <div className="cart_button_container">
      <button className="add_to_cart_btn">
          <Image src={cartIcon} alt="Cart" className="cart_icon" />
          
      </button>
    </div>
  );
};

export default AddToCartButton;
