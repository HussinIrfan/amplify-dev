import React, { useEffect } from "react";
import CalendarLocal from "./CalendarLocal";
import useCalendar from "./Calendar";
import moment from "moment";

export default function BasicCalendar() {
  const {
    events,
    selectedEvent,
    isModalOpen,
    mappedEvents,
    rsvpEvents,
    setIsModalOpen,
    handleEventSelect,
    handleCloseModalBasic,
    handleRSVPEvent,
  } = useCalendar(); // Only use selectedEvent and isModalOpen state

  useEffect(() => {
    if (!selectedEvent) {
      setIsModalOpen(false); // Close the modal if no event is selected
    }
  }, [selectedEvent, setIsModalOpen]);

  return (
    <>
      <CalendarLocal
        views={{
          month: true,
          agenda: true,
        }}
        toolbar={true}
        events={mappedEvents} // Pass the events fetched from the useCalendar hook
        onSelectEvent={handleEventSelect} // Update selected event
      />

      {/* Modal for viewing event details */}
      {selectedEvent && !rsvpEvents && (
        <div className="divPopUp">
          <h3>Event Details</h3>
          <p><strong>Title:</strong> {selectedEvent.title}</p>
          <p><strong>All Day Event:</strong> {selectedEvent.allDay ? "Yes" : "No"}</p>
          <p><strong>Start:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</p>
          <p><strong>End:</strong> {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Details:</strong> {selectedEvent.details}</p>
          <div className="divButton">
            <button type="button" onClick={handleRSVPEvent} className="popUpRSVPButton">
              RSVP
            </button>
            <button type="button" onClick={handleCloseModalBasic} className="popUpCancelButton">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for RSVPing to an event */}
      {selectedEvent && rsvpEvents && isModalOpen &&(
        <div className="divPopUp">
          <h3>RSVP to Event</h3>
          <p>Are you sure you want to RSVP to this event?</p>
          <div className="divButton">
            <button type="button" onClick={handleRSVPEvent} className="popUpRSVPButton">
              RSVP
            </button>
            <button type="button" onClick={handleCloseModalBasic} className="popUpCancelButton">
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
