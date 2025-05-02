// RSVPEventDetails.tsx

import React, { useEffect, useState } from "react";
import moment from "moment";
import RSVPForm, { RSVPFormData } from "./RSVPForm";
import useCalendar from "../admin2/Calendar";
import "./RSVPmodal.css";

export interface Event {
  id: string;
  start?: Date;
  end?: Date;
  title: string;
  allDay: boolean;
  location: string;
  details: string;
  eventDoc: string;
}

interface EventModalProps {
  event: Event;
  onClose: () => void;
  eventId: string;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [eventUrl, setEventUrl] = useState<string | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false); // Track RSVP submission success

  const { generateDocURL } = useCalendar();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await generateDocURL(event.eventDoc); // now returns just the string
        setEventUrl(url.url.toString());
      } catch (e) {
        console.error("Error generating document URL: ", e);
      }
    };
    fetchUrl();
  }, [event.eventDoc, generateDocURL]);

  const handleRSVPSubmit = (formData: RSVPFormData) => {
    console.log("RSVP Data:", formData);
    setRsvpSuccess(true); // Set success state to true
    setShowRSVPForm(false); // Hide the RSVP form
  };

  const closeAllModals = () => {
    setRsvpSuccess(false); // Reset the success state
    onClose(); // Close the event modal
  };

  return (
    <div className="modalBackground" style={{ display: "block" }}>
      <div className="rsvp-modal">
        <h2>{event.title}</h2>
        <p>
          <strong>Start:</strong>{" "}
          {event.start
            ? moment(event.start).format("MMMM Do YYYY, h:mm a")
            : "N/A"}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {event.end ? moment(event.end).format("MMMM Do YYYY, h:mm a") : "N/A"}
        </p>
        <p>
          <strong>All Day:</strong> {event.allDay ? "Yes" : "No"}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Details:</strong> {event.details}
        </p>
        <p>
          <strong>Event Flyer:</strong>{" "}
          {eventUrl ? (
            <a href={eventUrl} target="_blank" rel="noopener noreferrer">
              Link
            </a>
          ) : (
            "N/A"
          )}
        </p>

        <button className="rsvp-btn" onClick={() => setShowRSVPForm(true)}>
          RSVP
        </button>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>

      {showRSVPForm && (
        <RSVPForm
          eventId={event.id}
          onClose={() => setShowRSVPForm(false)}
          onSubmit={handleRSVPSubmit}
        />
      )}

      {/* Confirmation modal */}
      {rsvpSuccess && (
        <div className="rsvp-confirmation-modal">
          <div className="rsvp-confirmation-content">
            <h3>Thank you for your RSVP!</h3>
            <p>Your RSVP has been successfully submitted.</p>
            <button className="close-btn" onClick={closeAllModals}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventModal;
