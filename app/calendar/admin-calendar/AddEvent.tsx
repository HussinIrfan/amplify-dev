import React, { ChangeEvent, FormEvent, useState } from "react";
import useAddEvent from "./AddEventLogic";

const AddEvent: React.FC = () => {
  const {

    eventTitle,
    eventStartDate,
    eventStartMin,
    eventStartHour,
    eventStartPeriod, 
    eventEndDate, 
    eventEndHour, 
    eventEndMin, 
    eventEndPeriod,
    eventLocation,
    eventDetails,
    allday, 
    errorMessage,
    isModalOpen, 
    setEventTitle,
    setEventStartDate,
    setEventStartMin,
    setEventStartHour,
    setEventStartPeriod, 
    setEventEndDate,
    setEventEndHour,
    setEventEndMin,
    setEventEndPeriod, 
    setEventLocation,
    setEventDetails,
    setIsAllDay,
    setErrorMessage,
    setIsModalOpen,
    handleSubmit,
    closeAddEventModal,

  } = useAddEvent();

  if (!isModalOpen) return null;

  return (
    <div className="modalBackground">
      <div className="add-event-form-modal centered-modal">
        <div className="modal-content">
          <h3>Create New Event</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="eventTitle"
              placeholder="Event Title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="input-title"
            />

            <p>Start Time</p>
            <div className="date-time-container">
              <input
                type="date"
                name="eventStartDate"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                className="input-date"
              />
              <div className="time-picker">
                <select
                  name="eventStartHour"
                  value={eventStartHour}
                  onChange={(e) => setEventStartHour(e.target.value)}
                  className="input-hour"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                :
                <select
                  name="eventStartMinute"
                  value={eventStartMin}
                  onChange={(e) => setEventStartMin(e.target.value)}
                  className="input-minute"
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  name="eventStartPeriod"
                  value={eventStartPeriod}
                  onChange={(e) => setEventStartPeriod(e.target.value)}
                  className="input-period"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <p>End Time</p>
            <div className="date-time-container">
              <input
                type="date"
                name="eventEndDate"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                className="input-date"
              />
              <div className="time-picker">
                <select
                  name="eventEndHour"
                  value={eventEndHour}
                  onChange={(e) => setEventEndHour(e.target.value)}
                  className="input-hour"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                :
                <select
                  name="eventEndMinute"
                  value={eventEndMin}
                  onChange={(e) => setEventEndMin(e.target.value)}
                  className="input-minute"
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  name="eventEndPeriod"
                  value={eventEndPeriod}
                  onChange={(e) => setEventEndPeriod(e.target.value)}
                  className="input-period"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
            <input
              type="text"
              name="eventLocation"
              placeholder="Event Location"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className="input-title"
            />
            <textarea
              name="eventDetails"
              placeholder="Event Details"
              value={eventDetails}
              onChange={(e) => setEventDetails(e.target.value)}
              className="input-title"
            />
            
            <div className="all-day-container">
            <label>All Day</label>
              <input
                type="checkbox"
                id="allDayToggle"   
                checked={allday}
                onChange={() => setIsAllDay((prev) => !prev)}
              />
            </div>
            {errorMessage && <p style={{ color: "red", fontWeight:"bold"}}>{errorMessage}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={closeAddEventModal}>
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
