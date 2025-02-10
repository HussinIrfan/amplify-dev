import React from 'react';
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