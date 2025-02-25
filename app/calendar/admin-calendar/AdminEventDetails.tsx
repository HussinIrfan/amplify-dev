// adminEventDetails.tsx

import React, { useState } from "react";
import moment from "moment";
import "./admin-calendar.css";

export interface Event {
  start?: Date;
  end?: Date;
  title: string;
  allDay: boolean;
  details: string;
  RSVP?: number;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {

  return (
    <div className="modalBackground" style={{ display: "block" }}>
      <div className="admin-modal">
        <h2>{event.title}</h2>
        <p>
          <strong>Start:</strong> {event.start ? moment(event.start).format("MMMM Do YYYY, h:mm a") : "N/A"}
        </p>
        <p>
          <strong>End:</strong> {event.end ? moment(event.end).format("MMMM Do YYYY, h:mm a") : "N/A"}
        </p>            
        <p>
          <strong>All Day:</strong> {event.allDay ? "Yes" : "No"}
        </p>
        <p>
          <strong>Details:</strong> {event.details}
        </p>
        <p>
          <strong>RSVP:</strong> {event.RSVP}
        </p>

        {/* Button Group Wrapper */}
        <div className="admin-modal-buttons">
          <button className="admin-btn">Edit</button>
          <button className="admin-btn">RSVP List</button>
          <button className="admin-btn" onClick={onClose}>Close</button>
          <button className="delete-btn">Delete</button>
        </div>
        
      </div>
    </div>
  );
};

export default EventModal;
