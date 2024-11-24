import React, { useEffect } from "react";
import CalendarLocal from "./CalendarLocal";
import useCalendar from "./Calendar";
import moment from "moment";

export default function BasicCalendar() {
  const {
    events,
    selectedEvent,
    isModalOpen,
    setIsModalOpen,
    setSelectedEvent,
  } = useCalendar(); // Only use selectedEvent and isModalOpen state

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Clear selected event when modal is closed
  };

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
        events={events} // Pass the events fetched from the useCalendar hook
        onSelectEvent={(event: any) => setSelectedEvent(event)} // Update selected event
      />

      {/* Modal for viewing event details */}
      {selectedEvent && (
        <div className="divPopUp">
          <h3>Event Details</h3>
          <p><strong>Title:</strong> {selectedEvent.title}</p>
          <p><strong>Start:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}</p>
          <p><strong>End:</strong> {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}</p>
          <p><strong>Location:</strong> {selectedEvent.location}</p>
          <p><strong>Details:</strong> {selectedEvent.details}</p>
          <div className="divButton">
            <button type="button" onClick={handleCloseModal} className="popUpCancelButton">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal background */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={handleCloseModal}
        />
      )}
    </>
  );
}
