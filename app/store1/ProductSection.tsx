import React, { useEffect, useState } from "react";
import styles from "./assets/ProductSection.module.css";
import Gallery from "./Gallery";
import ProductDetails from "./ProductDetails";
import StoreHeader from "./StoreHeader";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";
Amplify.configure(outputs);
const client = generateClient<Schema>();

interface ProductImageProps {
    productId: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ }) => {
    const [product, setProduct] = useState<Schema["Product"] | null>(null);
    const [ productId, setProductId] = useState("4d6881e5-9ba4-4a01-bed2-552e875f0a76"); 
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (!productId || typeof productId !== "string") {
                    console.error("Invalid productId:", productId);
                    return;
                }

                const productData = await client.models.Product.get({ id: productId });
                console.log(productId);
                if (productData?.data) {
                    setProduct(productData.data as unknown as Schema["Product"]);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProductData();
    }, [productId]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className={styles["product_page_wrapper"]}>
            <section className={styles["title_page"]}>
                <StoreHeader title={product.name} />
            </section>

            <section className={styles["product_details"]}>
                {/* <Gallery images={[product.imageUrl]} /> */}
                <StorageImage
                    alt="No Image"
                    path="about-us-founders/1477035-beautiful-lake-tahoe-wallpaper-emerald-bay-3005x1997-macbook.jpg"
                  />
                <ProductDetails
                    id={product.id}
                    name={product.name}
                    price={product.basePrice}
                    description={product.description}
                    imageUrl={product.imageUrl}
                />
            </section>
        </div>
    );
};

export default ProductImage;
