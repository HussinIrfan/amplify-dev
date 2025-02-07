"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import ContactInfoBox from "../components/ContactInfoBox";
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
          <ContactInfoBox />
        </div>

      </main>
    </>
  );
}
