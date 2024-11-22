"use client";

import CustomNavbar from "../CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";
import "../calendar/index.css";
import AboutUs from "./AboutUs";
import EmailList from "./EmailList";
import OurWork from "./OurWork";
import BasicCalendar from "../calendar/BasicCalendar";
import ControlCalendar from "../calendar/ControlCalendar";

export default function AdminPage() {
  return (
    <>
      <main className="main">
        <CustomNavbar />
        <div>
          <h1 className="admin-h1"> Admin Settings</h1>
        </div>
        <AboutUs />
        <EmailList />
        <OurWork />
        <div className="div">
          <h2 className="admin-h2">Admin Calendar</h2>
          <div className="calendar-container">
            <ControlCalendar />
          </div>
          <h2 className="admin-h2"> Client Calendar</h2>
          <div className="calendar-container">
            <BasicCalendar />
          </div>
          <br />
        </div>
      </main>
    </>
  );
}
