import React, { useEffect } from "react";
import CalendarLocal from "./CalendarLocal";
import moment from "moment";

const events = [
    {
      start: moment("2025-02-18T10:00:00").toDate(),
      end: moment("2025-02-18T11:00:00").toDate(),
      title: "Event 1",
       allDay: false,
    },
  ];

export default function ClientCalendar() {

    return(
        <>
        <CalendarLocal
            views={{
                month: true,
                agenda: true,
            }}
            toolbar={true}
            events={events}
        />
        </>
    );
}