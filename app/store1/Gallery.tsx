import React from 'react';
import Image from 'next/image'; 
import styles from "./assets/Gallery.module.css";
import productImage from "./assets/t_shirt.png"; 

const Gallery: React.FC = () => {
    return (
        <div className={styles['gallery']}>
            <div className={styles['main_image']}>
                <Image src={productImage} alt="Product" className={styles['image']} layout="intrinsic" />
            </div>
        </div>
    );
}

export default Gallery;