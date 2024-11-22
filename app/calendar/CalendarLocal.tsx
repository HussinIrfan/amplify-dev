import { Calendar, momentLocalizer, CalendarProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const localizer = momentLocalizer(moment);

export default function CalendarLocal(props: Omit<CalendarProps, "localizer">) {
  return <Calendar {...props} localizer={localizer} />;
}
