import React from "react";
import styles from "./ProductDetails.module.css";

interface ProductDetailsProps {
    id: string;
    price: number;
    description: string;
    quantity: number;

}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    id,
    price,
    description,
    quantity
}) => {
    return (
        <section className={styles['product_details']}>
            <span className={styles['description']}>        
                {description}
            </span>

            <span className={styles['price']}>
                ${price.toFixed(2)}
            </span>

            <span className={styles ['sizing_buttons']}>
                <button className={styles ['size']}>XS</button>
                <button className={styles ['size']}>S</button>
                <button className={styles ['size']}>M</button>
                <button className={styles ['size']}>L</button>
                <button className={styles ['size']}>XL</button>
            </span>

            <div>
                <span className={styles['quantity']}>
                    Quanity: {quantity}
                </span>

                <button className={styles['btn-wrapper']}>Add to Cart</button>
            </div>

        </section>
    )

}

export default ProductDetails;
