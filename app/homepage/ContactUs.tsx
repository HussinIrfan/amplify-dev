import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
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
      <form className={styles.contactForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="firstName">First Name</label>
            <input className={styles.input} type="text" id="firstName" placeholder="First Name" required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="lastName">Last Name</label>
            <input className={styles.input} type="text" id="lastName" placeholder="Last Name" required />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input className={styles.input} type="email" id="email" placeholder="Email" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="phone">Phone</label>
          <input className={styles.input} type="tel" id="phone" placeholder="Phone Number" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Message</label>
          <textarea className={styles.textarea} id="message" placeholder="Your Message" rows={4}></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;
