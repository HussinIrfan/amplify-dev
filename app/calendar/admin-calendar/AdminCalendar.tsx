import React, { useState } from "react";
import CalendarLocal from "../CalendarLocal";
import moment from "moment";
import EventDetails, { Event } from "./AdminEventDetails";
import "./admin-calendar.css";
import { useCollapse } from "../../supportFunctions/ToggleCollase";
import { Event as RBCEvent } from "react-big-calendar";

const events: Event[] = [
  {
    start: moment("2025-02-18T10:00:00").toDate(),
    end: moment("2025-02-18T11:00:00").toDate(),
    title: "Event 1",
    allDay: false,
    details: "test 1",
    RSVP: 1,
  },

  {
    start: moment("2025-02-14T10:00:00").toDate(),
    end: moment("2025-02-14T11:00:00").toDate(),
    title: "Event 2",
    allDay: false,
    details: "test 2",
    RSVP: 2,
  },
  {
    start: moment("2025-02-17T10:00:00").toDate(),
    end: moment("2025-02-17T11:00:00").toDate(),
    title: "Event 3",
    allDay: false,
    details: "test 3",
    RSVP: 3,
  },
];

export default function AdminCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { isContentCollapsed, toggleCollapse } = useCollapse();

  // Handle event selection
  const handleEventSelect = (event: RBCEvent) => {
    setSelectedEvent(event as Event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Admin Calendar{" "}
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? ".collapsed" : ""
            }`}
            style={{
              display: "inline-block",
              marginLeft: "8px",
              transition: "transform 0.3s",
              transform: isContentCollapsed ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          >
            ▼
          </span>
        </h2>

        {/* Collapsible Section */}
        {isContentCollapsed && (
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
              {selectedEvent && (
                <div className="calendar-internal">
                  <EventDetails event={selectedEvent} onClose={closeModal} />
                </div>
              )}
            </div>
            <button className="admin-cal-btn">Add Event</button>
          </>
        )}
      </div>
    </>
  );
}
