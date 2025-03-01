import React, { useEffect } from "react";
import CalendarLocal from "./CalendarLocal";
import useCalendar from "./Calendar";
import moment from "moment";
import logoImage from "../navbarAssets/Logo-CutOut.png";
import Image from "next/image";

export default function BasicCalendar() {
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
    handleEventSelect,
    handleCloseModalBasic,
    handleRSVPEventClick,
  } = useCalendar(); // Only use selectedEvent and isModalOpen state

  useEffect(() => {
    if (!selectedEvent) {
      setIsModalOpen(false); // Close the modal if no event is selected
    } else if (selectedEvent && isRSVPModalOpen) {
      setIsModalOpen(false);
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
      {selectedEvent && (
        <div className="divPopUp">
          <Image src={logoImage} alt="Logo" className="logo" />
          <h3 className="h3-title">Event Details</h3>
          <p className="p-mobile">
            <strong className="strong-title">Title:</strong> {selectedEvent.title}
          </p>
          <p className="p-mobile">
            <strong className="strong-title">All Day Event:</strong>{" "}
            {selectedEvent.allDay ? "Yes" : "No"}
          </p>
          <p className="p-mobile">
            <strong className="strong-title">Start:</strong>{" "}
            {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
          </p>
          <p className="p-mobile">
            <strong className="strong-title">End:</strong>{" "}
            {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
          </p>
          <p className="p-mobile">
            <strong className="strong-title">Location:</strong> {selectedEvent.location}
          </p>
          <p className="p-mobile">
            <strong className="strong-title">Details:</strong> {selectedEvent.details}
          </p>
          <div className="divButton">
            <button
              type="button"
              onClick={handleRSVPEventClick}
              className="popUpRSVPButton"
            >
              RSVP
            </button>
            <button
              type="button"
              onClick={handleCloseModalBasic}
              className="popUpCancelButton"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for RSVP to an event */}
      {isRSVPModalOpen && (
        <div className="divPopUp">
          <h3>RSVP Event: {selectedEvent.title}</h3>
          <div className="p-box">
            <p>
              Start Date:{" "}
              {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              End Date: {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>Location: {selectedEvent.location}</p>
            <p>Details: {selectedEvent.details}</p>
          </div>
          <hr className="bold-hr" />
          <form>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                value={rsvpFName}
                onChange={(e) => setRsvpFName(e.target.value)}
                className="popUpInputBox"
              ></input>
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                value={rsvpLName}
                onChange={(e) => setRsvpLName(e.target.value)}
                className="popUpInputBox"
              ></input>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                value={rsvpEmail}
                onChange={(e) => setRsvpEmail(e.target.value)}
                className="popUpInputBox"
              ></input>
              {/* Display error message */}
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="tel"
                value={rsvpPhone}
                placeholder="555-555-5555"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={(e) => setRsvpPhone(e.target.value)}
                className="popUpInputBox"
              ></input>
            </div>
            <div>
              <label>Party Size</label>
              <select
                value={rsvpAttendeeCount}
                onChange={(e) => setRsvpAttendeeCount(Number(e.target.value))}
                className="popUpInputBox"
              >
                {/* Values from 1 - 10 */}
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <div className="divButton">
              <button type="submit" onClick={handleRSVPSubmit}>
                Submit
              </button>
              <button type="button" onClick={handleCloseRSVP}>
                Cancel
              </button>
            </div>
          </form>
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
          onClick={handleCloseModalBasic}
        />
      )}
    </>
  );
}
