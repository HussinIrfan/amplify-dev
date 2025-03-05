"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection";
import Footer from "../footer/footer";
import styles from "./assets/page.module.css";
import AddToCartButton from "./AddToCartButton";
import useStore from "../admin/storeAdmin/StoreLogic";
import { Link } from "@nextui-org/react";

export default function AdminPage() {
  // Admin store setting
  const { storeOpen } = useStore();

  return storeOpen ? (
    <div>
      <main className={styles["main"]}>
        <CustomNavbar />

        <AddToCartButton />

        <div className={styles["content"]}>
          <ProductSection />
        </div>

        <div>
          <Footer />
        </div>
      </main>
    </div>
  ) : (
    <div className="store-closed-container">
      <h1>Store Closed</h1>
      <p>Sorry, the store is currently closed. Please check back later.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
