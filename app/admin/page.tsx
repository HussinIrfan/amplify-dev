"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import CustomNavbar from "../CustomNavbar";
Amplify.configure(outputs);


export default function AdminPage() {
  
  
  return (
    <main>
      <CustomNavbar />
      
    </main>
  );
}
