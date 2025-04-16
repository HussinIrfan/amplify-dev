// ClientCalendar.tsx

import React, { useState } from "react";
import CalendarLocal from "../CalendarLocal";
import moment from "moment";
import RSVPEvent, { Event } from "./RSVPEventDetails"; // Import the EventModal component
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
  } = useCalendar(); // Only use selectedEvent and isModalOpen state



  // Handle event selection
  const handleEventSelect = (event: RBCEvent) => {
    setSelectedEvent(event as Event);
    console.log('event: ', selectedEvent);
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
          events={mappedEvents}
          onSelectEvent={handleEventSelect} // Open modal when event is clicked
        />


        {/* Modal to display event details */}
        {selectedEvent && (
          <div className="calendar-internal-RSVP"
          >
            <RSVPEvent eventId={selectedEvent.id} event={selectedEvent} onClose={closeModal} />
          </div>
        )}
      </div>
    </>
  );
}
