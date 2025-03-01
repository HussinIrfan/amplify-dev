import React, { useState } from "react";
import styles from "./assets/ProductDetails.module.css";

interface ProductDetailsProps {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    imageUrl: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    id,
    name,
    price,
    description,
    quantity,
    imageUrl
}) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

        const newItem = {
            id,
            name,
            price,
            size: selectedSize,
            quantity: 1, // Defaults quantity to 1
            imageUrl
        };

        // Check if the item with the same ID and size already exists in the cart
        const existingItemIndex = cartItems.findIndex(
            (item: any) => item.id === id && item.size === selectedSize
        );

        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Otherwise, add a new item
            cartItems.push(newItem);
            
        }

        // Save updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cartItems));

        const value = localStorage.getItem(cartItems);
        console.log(cartItems, value);

        // Redirect to the cart page
        // window.location.href = "/cart";
    };

    return (
        <section className={styles['product_details']}>
            <span className={styles['description']}>{description}</span>

            <span className={styles['price']}>${price.toFixed(2)}</span>

            <span className={styles['sizing_buttons']}>
                {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                        key={size}
                        className={`${styles['size']} ${selectedSize === size ? styles['selected'] : ''}`}
                        onClick={() => handleSizeSelection(size)}
                    >
                        {size}
                    </button>
                ))}
            </span>

            <div>
                <span className={styles['quantity']}>Quantity: {quantity}</span>

                <button className={styles['btn-wrapper']} onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </section>
    );
};

export default ProductDetails;

