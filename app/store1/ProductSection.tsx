import React from "react";
import styles from "./assets/ProductSection.module.css";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";
import StoreHeader from "./StoreHeader";
import { title } from "process";

const ProductImage = () => {
    

    return (
        <div className={styles ['product_page_wrapper']}>
            <section className={styles ['title_page']}>
                <StoreHeader title="Product Title" />
            </section>

            <section className={styles ['product_details']}>
                <Gallery />
                <ProductDetails 
                    id={"ouiqw89925"} 
                    name = "test"
                    price={25}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Reiciendis repellendus alias vitae ut neque natus reprehenderit laboriosam asperiores, 
                                    voluptates dicta quas veritatis commodi voluptatibus vel aspernatur itaque minima tempora. 
                                    Eligendi? You will love it!"
                    quantity={30}
                    imageUrl = "test"
                />
                    
            </section>
        </div>
    )

}

export default ProductImage;