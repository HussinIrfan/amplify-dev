import React from 'react';
<<<<<<< HEAD
import Image from 'next/image'; 
import styles from "./Gallery.module.css";
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
=======
import styles from "./Gallery.module.css";

const Gallery = () => {
    return (
        <div className={styles['gallery']}>
            <div className={styles['main_image']}>


            </div>

            <div className={styles['image_options']}>
                <div className={styles['image']}></div>
                <div className={styles['image']}></div>
                <div className={styles['image']}></div>
                <div className={styles['image']}></div>
                <div className={styles['image']}></div>

            </div>

        </div>

    )

}

export default Gallery;
>>>>>>> main-t
