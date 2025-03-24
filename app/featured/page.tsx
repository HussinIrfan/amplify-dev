"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import "./FeaturedStyles.css";
import useStore from "../admin/storeAdmin/StoreLogic";
import { generateClient } from "aws-amplify/data";
// import type { Schema } from "@/amplify/data/resource"; // temporarily disabled due to missing backend schema

// create an amplify client instance
const client = generateClient<any>();

const FeaturedPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // store products in state without relying on Schema

  // fetch products from the backend on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await client.models.Product.list({}); // pass an empty filter object, fetch products from db
        if (response.data) {
          setProducts(response.data); // store fetched products in state
        }
      } catch (error) {
        console.error("error fetching products:", error);
      }
    };

    fetchProducts(); // call the function when the page loads
  }, []);

  // admin store setting
  const { storeOpen } = useStore();

  return (
    <div className="page-container">
      {storeOpen ? (
        <>
          <CustomNavbar />
          <main className="featured-page">
            <h1 style={{ textAlign: "center", fontSize: "1.8rem", padding: "10px" }}>
              Featured Products
            </h1>
            <div className="yellow-bar" style={{ width: "80%", margin: "10px auto" }}></div>
            <div className="product-grid">
              {products.length > 0 ? (
                products
                  .filter((product) => product) // removes null/undefined products
                  .map((product, index) => (
                    <div key={index} className="product-card">
                      {/* safe null check for product properties */}
                      <Image
                        src={product.imageUrl || "/default_stor_image.jpg"}
                        alt={product.name || "No name available"}
                        width={300}
                        height={300}
                        className="product-image"
                        style={{
                          borderRadius: "10px",
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />


                      <h3 className="product-name">{product.name || "unnamed product"}</h3>
                      <p className="product-description">
                        {product.description || "no description available."}
                      </p>
                      <p className="product-price">
                        ${product.basePrice ? product.basePrice.toFixed(2) : "N/A"}
                      </p>

                      {/* "view product" now links to /store1 */}
                      <Link href={`/store1`}>
                        <button className="view-product">View Product</button>
                      </Link>
                    </div>
                  ))
              ) : (
                <p>Loading products...</p>
              )}
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