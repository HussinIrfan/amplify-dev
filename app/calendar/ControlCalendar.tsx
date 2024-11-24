import React, { useState } from "react";
import CalendarLocal, { localizer } from "./CalendarLocal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import useCalendar from "./Calendar"; // Import the hook
import moment from 'moment';

const DndDCalendar = withDragAndDrop(CalendarLocal);

const ControlCalendar: React.FC = () => {
  const {
    events,
    isModalOpen,
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    eventLocation,
    eventDetails,
    allday,
    errorMessage,
    selectedEvent,
    setIsModalOpen,
    setEventTitle,
    setEventStartDate,
    setEventEndDate,
    setEventStartTime,
    setEventEndTime,
    setEventLocation,
    setEventDetails,
    setIsAllDay,
    setSelectedEvent,
    setErrorMessage,
    handleSubmit,
    resetFormFields,
    formatDate,
  } = useCalendar(); // Use the custom hook to get the calendar logic

  const handleAddEventClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetFormFields();
    setSelectedEvent(null); // Clear selected event when modal is closed
  };

  const handleEventSelect = (event: any) => {
    setSelectedEvent(event); // Store the selected event's details
  };

  return (
    <>
      <DndDCalendar
        localizer={localizer}
        events={events}
        draggableAccessor={(event) => true}
        onSelectEvent={handleEventSelect} // Update the handler to store the selected event
      />
      <div className="divButton">
        <button onClick={handleAddEventClick}>Add Event</button>
      </div>

      {/* Modal for adding a new event */}
      {isModalOpen && (
        <div className="divPopUp">
          <h3>Create a New Event</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Event Title:</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Event Title"
                className="popUpInputBox"
              />
            </div>
            <div className="allDayToggle">
              <label>All Day</label>
              <input
                type="checkbox"
                checked={allday}
                onChange={() => setIsAllDay((prev) => !prev)}
              />
            </div>
            <div className="popUpInputRow">
              <div className="popUpInputColumn">
                <label>Start Date:</label>
                <input
                  type="date"
                  value={eventStartDate}
                  onChange={(e) => setEventStartDate(e.target.value)}
                  className="popUpInputBox"
                />
              </div>
              <div className="popUpInputColumn">
                <label>Start Time:</label>
                <input
                  type="time"
                  value={eventStartTime}
                  onChange={(e) => setEventStartTime(e.target.value)}
                  className="popUpInputBox"
                  disabled={allday}
                />
              </div>
            </div>
            <div className="popUpInputRow">
              <div className="popUpInputColumn">
                <label>End Date:</label>
                <input
                  type="date"
                  value={eventEndDate}
                  onChange={(e) => setEventEndDate(e.target.value)}
                  className="popUpInputBox"
                />
              </div>
              <div className="popUpInputColumn">
                <label>End Time:</label>
                <input
                  type="time"
                  value={eventEndTime}
                  onChange={(e) => setEventEndTime(e.target.value)}
                  className="popUpInputBox"
                  disabled={allday}
                />
              </div>
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                placeholder="Location"
                className="popUpInputBox"
              />
            </div>
            <div>
              <label>Event Details</label>
              <textarea
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="Details"
                className="popUpInputBox-Deatils"
              />
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="divButton">
              <button type="button" onClick={handleCloseModal} className="popUpCancelButton">
                Cancel
              </button>
              <button type="submit" className="popUpSaveButton">
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/*TODO:CODE NEEDS TO PULL FROM DB NOT MOMENT INSTANCE. Modal for viewing event details */}
      {selectedEvent && (
  <div className="divPopUp">
    <h3>Event Details</h3>
    <p><strong>Title:</strong> {selectedEvent.title}</p>
    <p><strong>Start:</strong> {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm:ss")}</p>
    <p><strong>End:</strong> {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm:ss")}</p>
    <p><strong>Location:</strong> {selectedEvent.location}</p>
    <p><strong>Details:</strong> {selectedEvent.details}</p>
    <div className="divButton">
      <button type="button" onClick={handleCloseModal} className="popUpCancelButton">
        Close
      </button>
    </div>
  </div>
)}

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
};

export default ControlCalendar;
