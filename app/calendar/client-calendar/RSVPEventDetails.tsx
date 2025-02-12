// RSVPEventDetails.tsx

import React, { useState } from "react";
import moment from "moment";
import RSVPForm, { RSVPFormData } from "./RSVPForm"; // Import the new RSVPForm component
import "./RSVPmodal.css";

export interface Event {
  start?: Date;
  end?: Date;
  title: string;
  allDay: boolean;
  details: string;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [showRSVPForm, setShowRSVPForm] = useState(false);

  const handleRSVPSubmit = (formData: RSVPFormData) => {
    // You can handle form data here, for example, save to a server or log it.
    console.log("RSVP Data:", formData);
    setShowRSVPForm(false); // Close the RSVP form after submitting
  };

  return (
    <div className="modalBackground" style={{ display: "block" }}>
      <div className="rsvp-modal">
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

        {/* RSVP Button to open RSVP form */}
        <button className="rsvp-btn" onClick={() => setShowRSVPForm(true)}>RSVP</button>

        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>Close</button>

    </div>
        {/* Show RSVP form when button is clicked */}
        {showRSVPForm && (
          <RSVPForm onClose={() => setShowRSVPForm(false)} onSubmit={handleRSVPSubmit} />
        )}
      </div>
  );
};

export default EventModal;
