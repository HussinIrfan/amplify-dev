"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import ProductSection from "./ProductSection"
import ContactInfoBox from "../components/ContactInfoBox";

export default function AdminPage() {
  return (
    <>
      <main className="main">
        <CustomNavbar />
        <ProductSection />
        <ContactInfoBox />

      </main>
    </>
  );
}
