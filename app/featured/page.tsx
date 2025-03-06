"use client";

import React from "react";
import Image from "next/image";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import "./FeaturedStyles.css";
import useStore from "../admin/storeAdmin/StoreLogic";
import { Link } from "@nextui-org/react";

const FeaturedPage: React.FC = () => {
  const products = [
    {
      image: "/firefighter_tshirt.jpg",
      name: "Product 1",
      description: "This is a description for Product 1.",
      price: 19.99,
    },
    {
      image: "/firefighter_tshirt.jpg",
      name: "Product 2",
      description: "This is a description for Product 2.",
      price: 29.99,
    },
    {
      image: "/firefighter_tshirt.jpg",
      name: "Product 3",
      description: "This is a description for Product 3.",
      price: 39.99,
    },
    {
      image: "/firefighter_tshirt.jpg",
      name: "Product 4",
      description: "This is a description for Product 4.",
      price: 49.99,
    },
  ];

  // Function to handle size selection (for now, it does nothing)
  const handleSizeClick = (size: string) => {
    console.log(`Selected size: ${size}`);
  };

  // Admin store setting
  const { storeOpen } = useStore();

  return (
    <div className="page-container">
      {storeOpen ? (
        <>
          <CustomNavbar />

          <main className="featured-page">
            <h1>Featured Products</h1>
            <div className="yellow-bar"></div>
            <div className="product-grid">
              {products.map((product, index) => (
                <div key={index} className="product-card">
                  {/* Next.js Image component instead of <img> */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300} // Adjust width
                    height={300} // Adjust height
                    className="product-image"
                    style={{ borderRadius: "10px" }}
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>

                  {/* Size Buttons */}
                  <div className="size-buttons">
                    {["S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className="size-button"
                        onClick={() => handleSizeClick(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          </main>

          <Footer />
        </>
      ) : (
        <div className="store-closed-container">
          <h1>Store Closed</h1>
          <p>Sorry, the store is currently closed. Please check back later.</p>
          <Link href="/">Return Home</Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedPage;
