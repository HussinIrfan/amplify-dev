import React, { useState } from "react";
import "./RSVPForm.css"; // Import any CSS specific to this form if needed
import "./RSVPmodal.css";

interface RSVPFormProps {
  onClose: () => void;
  onSubmit: (formData: RSVPFormData) => void;
}

export interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  partySize: number;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    partySize: 1, // Set default party size to 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePartySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prevState) => ({
      ...prevState,
      partySize: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Party Size:
          <select
            name="partySize"
            value={formData.partySize}
            onChange={handlePartySizeChange}
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
