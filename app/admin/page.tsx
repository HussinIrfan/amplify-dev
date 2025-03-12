"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use the correct hook from 'next/navigation'
import CustomNavbar from "../customNavbar/CustomNavbar";
import WebsiteSettings from "./WebsiteSettings";
import EmailList from "./emailList/EmailList";
import Documents from "./documents/Documents";
import StoreFront from "./storeAdmin/Store";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();  

  useEffect(() => {
    // Check if the user is logged in by looking at localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If user is not authenticated, redirect to the login page
    if (!isLoggedIn) {
      router.push("/login");  // Ensure the correct redirect function is used
    } else {
      setIsAuthenticated(true); // If logged in, update state to show admin page
    }
  }, [router]); // Re-run when router is updated

  // If the user is not authenticated, show nothing or a loading state
  if (!isAuthenticated) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="admin-config">
      <div className="navbar-admin">
        <CustomNavbar />
      </div>
      <div>
        <h1 className="admin-h1">Admin Settings</h1>
      </div>
      <WebsiteSettings />
      <EmailList />
      <Documents />
      <StoreFront />
    </div>
  );
}

export default AdminPage;
