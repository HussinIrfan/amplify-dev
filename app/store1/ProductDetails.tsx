import React, { useState, useEffect } from "react";
import styles from "./assets/ProductDetails.module.css";
import cartImage from "./assets/cart.png"; // Ensure you have a cart icon image

interface ProductDetailsProps {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    id,
    name,
    price,
    description,
    imageUrl
}) => {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");
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

    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQuantity(parseInt(event.target.value));
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
            quantity: selectedQuantity,
            imageUrl
        };

        const existingItemIndex = cartItems.findIndex(
            (item: any) => item.id === id && item.size === selectedSize
        );

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += selectedQuantity;
        } else {
            cartItems.push(newItem);
        }

        localStorage.setItem("cart", JSON.stringify(cartItems));

        const newCartCount = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(newCartCount);

        setConfirmationMessage(`${name} (${selectedSize}, Quantity: ${selectedQuantity}) has been added to the cart!`);
        setTimeout(() => setConfirmationMessage(""), 3000);

        const value = localStorage.getItem("cart");
        console.log(cartItems, value);
    };

    return (
        <section className={styles['product_details']}>
            <span className={styles['description']}>{description}</span>
            <span className={styles['price']}>${price.toFixed(2)}</span>

            <span className={styles['sizing_buttons']}>
                {Array.from(["XS", "S", "M", "L", "XL", "XXL"], size => (
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
                <label className={styles['quantity_label']}>
                    Quantity:
                    <select value={selectedQuantity} onChange={handleQuantityChange} className={styles['quantity_select']}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </label>
                <button className={styles['btn-wrapper']} onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>

            {confirmationMessage && <div className={styles['confirmation']}>{confirmationMessage}</div>}
        </section>
    );
};

export default ProductDetails;
