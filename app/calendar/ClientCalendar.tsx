// ClientCalendar.tsx

import React, { useState } from "react";
import CalendarLocal from "./CalendarLocal";
import moment from "moment";
import RSVPEvent, { Event } from "./RSVPEventDetails"; // Import the EventModal component
import { Event as RBCEvent } from "react-big-calendar";


const events: Event[] = [
  {
    start: moment("2025-02-18T10:00:00").toDate(),
    end: moment("2025-02-18T11:00:00").toDate(),
    title: "Event 1",
    allDay: false,
  },

  {
    start: moment("2025-02-14T10:00:00").toDate(),
    end: moment("2025-02-14T11:00:00").toDate(),
    title: "Event 2",
    allDay: false,
  },
  {
    start: moment("2025-02-17T10:00:00").toDate(),
    end: moment("2025-02-17T11:00:00").toDate(),
    title: "Event 3",
    allDay: false,
  },
];

export default function ClientCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Handle event selection
  const handleEventSelect = (event: RBCEvent) => {
    setSelectedEvent(event as Event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="calendar-container">
        <CalendarLocal
          views={{
            month: true,
            agenda: true,
          }}
          toolbar={true}
          events={events}
          onSelectEvent={handleEventSelect} // Open modal when event is clicked
        />


        {/* Modal to display event details */}
        {selectedEvent && (
          <div className="calendar-internal"
          >
            <RSVPEvent event={selectedEvent} onClose={closeModal} />
          </div>
        )}

        {/* Modal to display RSVP event form */}
      </div>
    </>
  );
}
