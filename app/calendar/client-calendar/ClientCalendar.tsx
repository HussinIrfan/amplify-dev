// ClientCalendar.tsx

import React, { useState, useEffect } from "react";
import CalendarLocal from "../CalendarLocal";
import RSVPEvent, { Event } from "./RSVPEventDetails";
import { Event as RBCEvent } from "react-big-calendar";
import useCalendar from "../admin2/Calendar";

export default function ClientCalendar() {
  const {
    events,
    selectedEvent,
    isModalOpen,
    isRSVPModalOpen,
    mappedEvents,
    rsvpFName,
    rsvpLName,
    rsvpEmail,
    rsvpPhone,
    rsvpAttendeeCount,
    errorMessage,
    setSelectedEvent,
    setErrorMessage,
    setIsModalOpen,
    setIsRSVPModalOpen,
    setRsvpFName,
    setRsvpLName,
    setRsvpEmail,
    setRsvpPhone,
    setRsvpAttendeeCount,
    handleCloseRSVP,
    handleRSVPSubmit,
    handleCloseModalBasic,
    handleRSVPEventClick,
  } = useCalendar();

  const [defaultView, setDefaultView] = useState<"month" | "agenda">("month");

  // SSR-safe mobile detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      setDefaultView(isMobile ? "agenda" : "month");

      const handleResize = () => {
        const isMobileView = window.innerWidth <= 768;
        setDefaultView(isMobileView ? "agenda" : "month");
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleEventSelect = (event: RBCEvent) => {
    setSelectedEvent(event as Event);
    console.log("event: ", selectedEvent);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="calendar-container">
        <CalendarLocal
          views={{ month: true, agenda: true }}
          defaultView={defaultView}
          toolbar={true}
          events={mappedEvents}
          onSelectEvent={handleEventSelect}
        />

        {selectedEvent && (
          <div className="calendar-internal-RSVP">
            <RSVPEvent
              eventId={selectedEvent.id}
              event={selectedEvent}
              onClose={closeModal}
            />
          </div>
        )}
      </div>
    </>
  );
}
