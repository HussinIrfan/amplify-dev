import { useState } from "react";
import Calendar from "../CalendarLocal";
import { Event as RBCEvent, Views } from "react-big-calendar";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import AdminEventDetails, { Event } from "./AdminEventDetails";
import AddEventModal from "./AddEvent";
import useAdminCalendar from "./AdminCalendarLogic";

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
  } = useAdminCalendar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                    closeAddEventModal={closeAddEventModalAdmin}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                  />
                )}
              </div>
              <button className="add-event-button" onClick={openAddEventModal}>
                Add Event
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
