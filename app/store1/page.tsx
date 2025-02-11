"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import Footer from "../footer/footer";
import styles from "./page.module.css"

export default function AdminPage() {
  return (
    <>
      <main className={styles ["main"]}>
        <CustomNavbar />
     
        <div className={styles ["content"]}>
          <ProductSection />
        </div>

        <div className={styles ["contactInfo"]}>
          <Footer />
        </div>

      </main>
    </>
  );
}