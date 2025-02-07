import React from "react";
import styles from "./ProductSection.module.css";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";
// import firefighters1Image from "./assets/t_shirt.png";

const ProductImage = () => {
    return (
        <div className={styles ['product_page_wrapper']}>
            <section className={styles ['product_details']}>
                <Gallery />
                <ProductDetails 
                    id={"ouiqw89925"} 
                    title="Product title" 
                    price={25}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Reiciendis repellendus alias vitae ut neque natus reprehenderit laboriosam asperiores, 
                                    voluptates dicta quas veritatis commodi voluptatibus vel aspernatur itaque minima tempora. 
                                    Eligendi? You will love it!"
                    quantity={30}/>
            </section>
        </div>
    )

}

export default ProductImage;