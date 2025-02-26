import React, { useState } from "react";
import Calendar from "../CalendarLocal";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import useCalendar from "./Calendar"; // Import the hook
import moment from "moment";
import logoImage from "../../navbarAssets/Logo-CutOut.png";
import Image from "next/image";

const ControlCalendar: React.FC = () => {
  const {
    view,
    currentDate,
    isModalOpen,
    isRSVPModalOpen,
    eventTitle,
    eventStartDate,
    eventEndDate,
    eventStartTime,
    eventEndTime,
    eventLocation,
    eventDetails,
    allday,
    selectedEvent,
    errorMessage,
    mappedEvents,
    isEditMode,
    rsvpFName,
    rsvpLName,
    rsvpEmail,
    rsvpPhone,
    rsvpAttendeeCount,
    attendeesList,
    isAttendeesModalOpen,
    isContentCollapsed,
    attendeeSearchQuery,
    partySizeTotal,
    setAttendeesSearchOptions,
    setAttendeesSearchQuery,
    setAttendeesList,
    setEventTitle,
    setEventStartDate,
    setEventEndDate,
    setEventStartTime,
    setEventEndTime,
    setEventLocation,
    setEventDetails,
    setIsAllDay,
    setRsvpFName,
    setRsvpLName,
    setRsvpEmail,
    setRsvpPhone,
    setRsvpAttendeeCount,
    handleSubmit,
    handleRSVPSubmit,
    handleEventSelect,
    handleCloseModal,
    handleCloseRSVP,
    handleRSVPEventClick,
    handleAddEventClick,
    handleEditEventClick,
    handleDeleteEventClick,
    handleCloseAttendeesModal,
    handleListAttendeesClick,
    handleNavigate,
    handleViewChange,
    toggleCollapse,
  } = useCalendar(); // Use the custom hook to get the calendar logic

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Admin Calendar
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? "collapsed" : ""
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

        <div
          className={`collapsible-content ${
            !isContentCollapsed ? "collapsed" : "expanded"
          }`}
        >
          {/*Display entire calendar */}
          {isContentCollapsed && (
            <>
              <div className="calendar-container-admin">
                <Calendar
                  events={mappedEvents} // Pass the mapped events
                  onSelectEvent={handleEventSelect} // Update the handler to store the selected event
                  date={currentDate}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  view={view}
                />
                <button
                  className="add-event-button"
                  onClick={handleAddEventClick}
                >
                  Add Event
                </button>


                {/* Modal for adding a new event */}
                
                {isModalOpen && !isEditMode && (
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
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <div className="divButton">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="popUpCancelButton"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="popUpSaveButton">
                          Save Event
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Modal for viewing event details */}
                {selectedEvent && !isEditMode && !isAttendeesModalOpen && (
                  <div className="divPopUp">
                    <Image src={logoImage} alt="Logo" className="logo" />
                    <h3 className="h3-title">Event Details</h3>
                    <p>
                      <strong className="strong-title">Title:</strong>{" "}
                      {selectedEvent.title}
                    </p>
                    <p>
                      <strong className="strong-title">All Day Event:</strong>{" "}
                      {selectedEvent.allDay ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong className="strong-title">Start:</strong>{" "}
                      {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
                    </p>
                    <p>
                      <strong className="strong-title">End:</strong>{" "}
                      {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
                    </p>
                    <p>
                      <strong className="strong-title">Location:</strong>{" "}
                      {selectedEvent.location}
                    </p>
                    <p>
                      <strong className="strong-title">RSVP Total:</strong>{" "}
                      {partySizeTotal}
                    </p>
                    <p>
                      <strong className="strong-title">Details:</strong>{" "}
                      {selectedEvent.details}
                    </p>
                    <div className="divButton">
                      <button type="button" className="popUpCancelButton">
                        Email all Attendees
                      </button>
                      <button
                        type="button"
                        className="popUpCancelButton"
                        onClick={handleListAttendeesClick}
                        >
                        List Attendees
                      </button>
                      <button
                        type="button"
                        onClick={handleEditEventClick}
                        className="popUpCancelButton"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteEventClick}
                        className="popUpDeleteButton"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="popUpCancelButton"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {isAttendeesModalOpen && (
                  <div className="divTablePopUp">
                    <div className="attendee-div-container">
                      <h3>Attendees for {selectedEvent.title} event</h3>
                      <div className="attendee-search-container">
                        <input
                          type="text"
                          value={attendeeSearchQuery}
                          onChange={(e) =>
                            setAttendeesSearchQuery(e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <button className="attendee-popup-button">
                          Search
                        </button>
                        <button className="attendee-popup-button">
                          Email Selected
                        </button>
                        <button className="popUpDeleteButton">
                          Delete Selected
                        </button>
                      </div>
                      <div className="radio-buttons-row">
                        <label>
                          <input
                            type="radio"
                            name="selectedAttendeeSearchOptions"
                            value="name"
                            onChange={(e) =>
                              setAttendeesSearchOptions(e.target.value)
                            }
                            defaultChecked={true}
                          />
                          Name
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="selectedAttendeeSearchOptions"
                            value="email"
                            onChange={(e) =>
                              setAttendeesSearchOptions(e.target.value)
                            }
                          />
                          Email
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="selectedAttendeeSearchOptions"
                            value="phone"
                            onChange={(e) =>
                              setAttendeesSearchOptions(e.target.value)
                            }
                          />
                          Phone
                        </label>
                      </div>
                      {attendeesList.length > 0 ? (
                        <div className="table-container">
                          <table>
                            <thead>
                              <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Party Size</th>
                              </tr>
                            </thead>
                            <tbody>
                              {attendeesList.map((attendee) => (
                                <tr key={attendee.id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      onChange={(e) => {
                                        setAttendeesList((prevAttendees) =>
                                          prevAttendees.map((att) =>
                                            att.id === attendee.id
                                              ? {
                                                  ...att,
                                                  selected: e.target.checked,
                                                }
                                              : att
                                          )
                                        );
                                      }}
                                    />
                                  </td>
                                  <td>
                                    {attendee.nameFirst} {attendee.nameLast}
                                  </td>
                                  <td>{attendee.email}</td>
                                  <td>{attendee.phoneNumber}</td>
                                  <td>{attendee.partySize}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <p>No attendees found for this event.</p>
                      )}
                      <p>Total Number of Attendees: {partySizeTotal}</p>
                      <button onClick={handleRSVPEventClick}>
                        Add Attendee
                      </button>
                      <button onClick={handleCloseAttendeesModal}>Close</button>
                    </div>
                  </div>
                )}

                {/* Modal for RSVP to an event */}
                {isRSVPModalOpen && !isEditMode && (
                  <div className="divPopUp">
                    <h3>Add Attendee to: {selectedEvent.title}</h3>
                    <div className="p-box">
                      <p>
                        Start Date:{" "}
                        {moment(selectedEvent.start).format("YYYY-MM-DD HH:mm")}
                      </p>
                      <p>
                        End Date:{" "}
                        {moment(selectedEvent.end).format("YYYY-MM-DD HH:mm")}
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
                          onChange={(e) =>
                            setRsvpAttendeeCount(Number(e.target.value))
                          }
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

                {/* Modal for editing an event */}
                {isModalOpen && isEditMode && selectedEvent && (
                  <div className="calendar-container-admin">
                  <div className="divPopUp">
                    <h3 className="h3-title">Edit Event</h3>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <label className="strong-title">Event Title:</label>
                        <input
                          type="text"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                          placeholder="Event Title"
                          className="popUpInputBox"
                          />
                      </div>
                      <div className="allDayToggle">
                        <label className="strong-title">All Day</label>
                        <input
                          type="checkbox"
                          checked={allday}
                          onChange={() => setIsAllDay((prev) => !prev)}
                        />
                      </div>
                      <div className="popUpInputRow">
                        <div className="popUpInputColumn">
                          <label className="strong-title">Start Date:</label>
                          <input
                            type="date"
                            value={eventStartDate}
                            onChange={(e) => setEventStartDate(e.target.value)}
                            className="popUpInputBox"
                          />
                        </div>
                        <div className="popUpInputColumn">
                          <label className="strong-title">Start Time:</label>
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
                          <label className="strong-title">End Date:</label>
                          <input
                            type="date"
                            value={eventEndDate}
                            onChange={(e) => setEventEndDate(e.target.value)}
                            className="popUpInputBox"
                          />
                        </div>
                        <div className="popUpInputColumn">
                          <label className="strong-title">End Time:</label>
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
                        <label className="strong-title">Location</label>
                        <input
                          type="text"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          placeholder="Location"
                          className="popUpInputBox"
                        />
                      </div>
                      <div>
                        <label className="strong-title">Event Details</label>
                        <textarea
                          value={eventDetails}
                          onChange={(e) => setEventDetails(e.target.value)}
                          placeholder="Details"
                          className="popUpInputBox-Deatils"
                        />
                      </div>
                      {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                      )}
                      <div className="divButton">
                        <button
                          type="button"
                          onClick={handleCloseModal}
                          className="popUpCancelButton"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="popUpSaveButton">
                          Save Event
                        </button>
                      </div>
                    </form>
                  </div>
                  </div>
                )}
          </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ControlCalendar;
