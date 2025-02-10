"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import Footer from "../footer/footer";

export default function AdminPage() {
  return (
    <>
      <main className="main">
        <CustomNavbar />
        <ProductSection />
        <Footer />

      </main>
    </>
  );
}
