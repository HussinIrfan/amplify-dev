"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import CustomNavbar from "./customNavbar/CustomNavbar";

import HPheader from "./homepage/HPheader";
import ImageCarousel from "./homepage/ImageCarousel";
import NewsletterPopup from "./homepage/Newsletter";
import ContactUs from "./homepage/ContactUs";
import Footer from "./footer/footer";
Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {

  
  return (
    <main>
      <CustomNavbar />
    
      <HPheader />
      <ImageCarousel />
      <ContactUs/>
      <Footer/>
    </main>
  );
}
