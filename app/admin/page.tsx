"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { getCurrentUser, signOut } from "@aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { useState } from "react";
import CustomNavbar from "../customNavbar/CustomNavbar";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css"; // NEEDED FOR ADMIN CALENDAR
import EmailList from "./emailList/EmailList";
import WebsiteSettings from "./WebsiteSettings";
import StoreFront from "./storeAdmin/Store";

export default function AdminPage() {
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  /*TODO Place hideSignUp after Sandbox testing done */
  return (
    <Authenticator loginMechanisms={['email' ]} hideSignUp>
      {({ user }) => (
        <div className="admin-config">
          <CustomNavbar />
          <div>
            <h1 className="admin-h1">Admin Settings</h1>
          </div>
          <WebsiteSettings />
          <EmailList />
          <StoreFront />

          {/* Sign Out Button */}
          <button
            className="signOutButton"
            onClick={async () => {
              await signOut();
              window.location.reload(); //reload NEEDED, get backend errors when logging out and back in without reload
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </Authenticator>
  );
}
