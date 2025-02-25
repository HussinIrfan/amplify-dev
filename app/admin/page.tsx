"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";
import AboutUs from "./aboutUs/AboutUs";
import OurWork from "./ourWork/OurWork";
import Calendar from "../calendar/admin-calendar/AdminCalendar";
import Donations from "./donations/Donations";
import Store from "./storeAdmin/Store";
import News from "./news/News";
import WebsiteSettings from "./WebsiteSettings";
import Documents from "./documents/Documents";

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
        <Documents />
    </div>
    </>
  );
}
