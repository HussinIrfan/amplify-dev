"use client";

import CustomNavbar from "../CustomNavbar";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "../admin/admin.css";
import "./index.css";
import BasicCalendar from "./BasicCalendar";

export default function CalendarPage() {
  return (
    <>
      <main>
        <div>
          <CustomNavbar />
          <div>
            <h1>Calendar</h1>
          </div>
          <div className="calendar-container">
            <BasicCalendar />
          </div>
        </div>
      </main>
    </>
  );
}
