import React, { useState } from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general', // Default selected subject
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');
    console.log('AWS Region:', process.env.KEY_AWS_REGION);
    console.log('AWS Access Key ID:', process.env.KEY_AWS_ACCESS_KEY_ID);
    console.log('AWS Secret Access Key:', process.env.KEY_AWS_SECRET_ACCESS_KEY);
    // Send form data to API
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setResponseMessage('Your message has been sent successfully!');
      } else {
        setResponseMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setResponseMessage('Error sending message. Please try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <div className={styles.contactInfo}>
        <h3>Contact Us:</h3>
        <p>Office Phone: (555) 555-5555</p>
        <p>
          Please submit any questions, suggestions, or general feedback in the form below.
          We appreciate your comments and will respond as soon as possible.
        </p>
      </div>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input
              className={styles.input}
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input
              className={styles.input}
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phone">Phone</label>
          <input
            className={styles.input}
            type="tel"
            id="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="subject">Subject</label>
          <select
            className={styles.input}
            id="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          >
            <option value="general">General Inquiry</option>
            <option value="store_purchases">Store Purchases</option>
            <option value="donations">Donations</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Message</label>
          <textarea
            className={styles.textarea}
            id="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {responseMessage && <p className={styles.responseMessage}>{responseMessage}</p>}
    </div>
  );
};

export default ContactUs;
