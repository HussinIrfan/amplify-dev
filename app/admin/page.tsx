"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { signOut } from "@aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import "../page.module.css";
import "./admin.css";
import EmailList from "./emailList/EmailList";
import WebsiteSettings from "./WebsiteSettings";
import StoreFront from "./storeAdmin/Store";

export default function AdminPage() {
  return (
    <Authenticator loginMechanisms={['email']} hideSignUp>
      {({ user }) => (
        <div className="admin-config">
          <CustomNavbar />
          <div>
            <h1 className="admin-h1">Admin Settings</h1>
          </div>
          <WebsiteSettings />
          <EmailList />
          {/* All product management now lives inside StoreFront */}
          <StoreFront />
          
          <button className="signOutButton" onClick={async () => {
            await signOut();
            window.location.reload();
          }}>
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
}