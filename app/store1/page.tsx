"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import Footer from "../footer/footer";
import styles from "./assets/page.module.css"
import AddToCartButton from "./AddToCartButton";

export default function AdminPage() {
  return (
    <div>
      <main className={styles ["main"]}>
        <CustomNavbar />

        <AddToCartButton />
     
        <div className={styles ["content"]}>
          <ProductSection />
        </div>

        <div>
          <Footer />
        </div>

      </main>
    </div>
  );
}