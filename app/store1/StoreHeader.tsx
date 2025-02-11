import React from "react";
import styles from "./StoreHeader.module.css"

interface StoreHeaderProps {
    title: string;
}


const StoreHeader: React.FC<StoreHeaderProps>= ({
    title
}) => {
    return (
        <section>
            <span>{title}</span> 
            <div className={styles ['yellow-bar']}></div> 
        </section>
    )

}

export default StoreHeader;