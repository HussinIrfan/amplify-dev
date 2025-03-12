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
