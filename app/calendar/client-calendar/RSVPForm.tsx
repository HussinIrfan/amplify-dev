import React, { useState } from "react";
import "./RSVPForm.css"; // Import any CSS specific to this form if needed
import "./RSVPmodal.css";

import useCalendar from "../admin2/Calendar";

interface RSVPFormProps {
  onClose: () => void;
  onSubmit: (formData: RSVPFormData) => void;
  eventId: string;
}

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  partySize: number;
  sponsor: boolean;
  support: string;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ eventId, onClose, onSubmit }) => {
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
    sponsor,
    support,
    setSponsor,
    setSupport,
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

  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    partySize: 1, // Set default party size to 1
    sponsor: false, // Set default sponsor status to false
    support: "", // Set default support status to empty string
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRSVPSubmit(e, eventId);
    onSubmit(formData); // Pass form data back to parent
    onClose(); // Close the modal after submitting
  };

  return (
    <div className="rsvp-form-modal">
      <h4>RSVP Form</h4>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={rsvpFName}
            onChange={(e) => setRsvpFName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={rsvpLName}
            onChange={(e) => setRsvpLName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={rsvpEmail}
            onChange={(e) => setRsvpEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            value={rsvpPhone}
            placeholder="555-555-5555"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={(e) => setRsvpPhone(e.target.value)}
            required
          />
        </label>
        <label>
          Party Size:
          <select
            value={rsvpAttendeeCount}
            onChange={(e) => setRsvpAttendeeCount(Number(e.target.value))}
            required
          >
            {/* Party size options from 1 to 10 */}
            {Array.from({ length: 10 }, (_, i) => i + 1).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        {/* Checkbox to become a sponsor */}
        <div className="sponsor-checkbox-container">
          <label className="sponsor-checkbox-label">
            <input
              type="checkbox"
              checked={sponsor} // Use the sponsor state directly
              onChange={() => setSponsor((prev) => !prev)}
            />
          </label>
          <p>Become a Sponsor for Event / Additional Contributions</p>
        </div>
        {/* Conditionally render the support inquiry input if the checkbox is checked */}
        {sponsor && (
          <label>
            Sponsorship & Support Inquiry:
            <input
              value={support}
              onChange={(e) => setSupport(e.target.value)}
              required={sponsor} // Make it required only when the box is checked
            />
          </label>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="submit-button" type="submit">
          Submit RSVP
        </button>
        <button className="cancel-button" type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
