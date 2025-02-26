<<<<<<< HEAD
import { useState } from "react";
import Calendar from "../CalendarLocal";
import { Event as RBCEvent, Views } from "react-big-calendar";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import AdminEventDetails, { Event } from "./AdminEventDetails";
import AddEventModal from "./AddEvent";
import useAdminCalendar from "./AdminCalendarLogic";
=======
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
>>>>>>> 21e67f6817e51a30e6138faf3c9542685b1903eb

export default function AdminCalendar() {
  const {
    currentDate,
    setCurrentDate,
    selectedEvent,
    setSelectedEvent,
    view,
    setView,
    events,
    handleEventSelect,
    handleNavigate,
    handleViewChange,
    handleSubmit,
    openAddEventModal,
    closeAddEventModalAdmin,
    isAddEventModalOpen,
    newEvent,
    setNewEvent,
    isContentCollapsed,
    toggleCollapse,
    setIsAddEventModalOpen,
  } = useAdminCalendar();

<<<<<<< HEAD
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
=======
  const { isContentCollapsed, toggleCollapse } = useCollapse();

  // Handle event selection
  const handleEventSelect = (event: RBCEvent) => {
    setSelectedEvent(event as Event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
>>>>>>> 21e67f6817e51a30e6138faf3c9542685b1903eb
  };

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Admin Calendar
          <span
            className={`dropdown-arrow ${isContentCollapsed ? "collapsed" : ""}`}
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

        <div className={`collapsible-content ${!isContentCollapsed ? "collapsed" : "expanded"}`}>
          {isContentCollapsed && (
            <>
              <div className="calendar-container">
                <Calendar
                  events={events}
                  onSelectEvent={handleEventSelect}
                  date={currentDate}
                  onNavigate={handleNavigate}
                  onView={handleViewChange}
                  view={view}
                />

                {selectedEvent && (
                  <div className="calendar-internal">
                    <AdminEventDetails event={selectedEvent} onClose={closeAddEventModalAdmin} />
                  </div>
                )}

                {isAddEventModalOpen && (
                  <AddEventModal
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
              <button className="add-event-button" onClick={() => {
               setIsAddEventModalOpen((prev) => !prev);
               console.log("Modal state after click:", isAddEventModalOpen);
              }}>
                Add Event
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
