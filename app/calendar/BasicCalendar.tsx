import moment from "moment";
import CalendarLocal from "./CalendarLocal";

const events = [
  {
    start: moment("2024-11-18T10:00:00").toDate(),
    end: moment("2024-11-18T11:00:00").toDate(),
    title: "Event 1",
     allDay: false,
  },
];

export default function BasicCalendar() {

  return (
    <CalendarLocal
      events={events}
      view={"month"}
      toolbar={false}
    />
  );
}