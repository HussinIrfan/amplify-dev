"use client";

import CustomNavbar from "../customNavbar/CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";
<<<<<<< HEAD
import EmailList from "./emailList/EmailList";
=======
import AboutUs from "./aboutUs/AboutUs";
import OurWork from "./ourWork/OurWork";
import Calendar from "../calendar/admin-calendar/AdminCalendar";
import Donations from "./donations/Donations";
import Store from "./storeAdmin/Store";
import News from "./news/News";
>>>>>>> 21e67f6817e51a30e6138faf3c9542685b1903eb
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
        <Documents />
        <StoreFront />
    </div>
    </>
  );
}
