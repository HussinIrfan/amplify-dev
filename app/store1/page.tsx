"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import Footer from "../footer/footer";
<<<<<<< HEAD
=======
import styles from "./assets/page.module.css"
import AddToCartButton from "./AddToCartButton";
>>>>>>> 07ce94d86c2b99dc7732f4442d4e47bbbc5e46e0

export default function AdminPage() {
  return (
    <div>
      <main className={styles ["main"]}>
        <CustomNavbar />
<<<<<<< HEAD
        <ProductSection />
        <Footer />
=======

        <AddToCartButton />
     
        <div className={styles ["content"]}>
          <ProductSection />
        </div>

        <div>
          <Footer />
        </div>
>>>>>>> 07ce94d86c2b99dc7732f4442d4e47bbbc5e46e0

      </main>
    </div>
  );
}
