"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

import CustomNavbar from "./customNavbar/CustomNavbar";

import HPheader from "./homepage/HPheader";
import ImageCarousel from "./homepage/ImageCarousel";
import NewsletterPopup from "./homepage/Newsletter";
import ContactInfoBox from "./components/ContactInfoBox";
import ContactUs from "./components/ContactUs";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {

  
  return (
    <main>
      <CustomNavbar />
    
      <HPheader />
      <ImageCarousel />
      <NewsletterPopup />
      <ContactUs/>
      
      
      {/* Link to the login page */}
      
      
      <Link href="/login">Go to Login Page</Link>
      <ContactInfoBox />
     
     

      
    </main>
  );
}
