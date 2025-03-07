"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";
import EmailList from "./emailList/EmailList";
import WebsiteSettings from "./WebsiteSettings";
import Documents from "./documents/Documents";
import StoreFront from "./storeAdmin/Store";

export default function AdminPage() {
  return (
    <>
    <div className="admin-config">
        <div className="navbar-admin">
        <CustomNavbar />
        </div>
        <div>
          <h1 className="admin-h1"> Admin Settings</h1>
        </div>
        <WebsiteSettings />
        <EmailList />
        {/* <Documents /> */}
        <StoreFront />
        <br />
        <br />
        <br />
        <br />
    </div>
    </>
  );
}
