import { useEffect } from "react";
import CalendarLocal from "./CalendarLocal";
import useCalendar from "./Calendar";

export default function BasicCalendar() {
  const {
    events,
    // other state and handlers from useCalendar
  } = useCalendar();

  // Assuming CalendarLocal takes an array of events as a prop.
  return (
    <CalendarLocal
      views={{
        month: true,
        agenda: true,
      }}
      toolbar={true}
      events={events} // Pass the events fetched from the useCalendar hook
    />
  );
}
