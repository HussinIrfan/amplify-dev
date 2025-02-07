"use client";

import CustomNavbar from "../CustomNavbar";
import ContactInfoBox from "../components/ContactInfoBox";
import Image from 'next/image';
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "../admin/admin.css";
import "./index.css";
//import BasicCalendar from "./BasicCalendar";
import ClientCalendar from "./ClientCalendar";
import sltFirePhoto from "./slt-fire-group.jpg";

export default function CalendarPage() {
  return (
    <>
      <main className="main">
          <CustomNavbar />
          <div>
            <Image
            src={sltFirePhoto}
            alt="Photo"
            layout="responsive"
            objectFit="cover"
            className="background-image-div"
            />
            </div>
        <div className="calendar-div">
          <h2 className="calendar-h1">Event Calendar</h2>
          <div className="calendar-container">
            <ClientCalendar />
          </div>
        </div>
        <ContactInfoBox />
      </main>
    </>
  );
}
