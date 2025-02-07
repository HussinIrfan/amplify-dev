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
        <div className={styles['product_details']}>
            <span className={styles['description']}>        
                {description}
            </span>

            <span className={styles['price']}>
                ${price.toFixed(2)}
            </span>

            <div>
                <span className={styles['quantity']}>
                    Quanity: {quantity}
                </span>

                <button className={styles['btn-wrapper']}>Add to Cart</button>
            </div>

        </div>
    )

}

export default ProductDetails;
