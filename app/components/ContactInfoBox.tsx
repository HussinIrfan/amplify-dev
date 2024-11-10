import React from "react";

const ContactInfoBox = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "20px", margin: "20px 0", fontFamily: "Arial, sans-serif" }}>
      <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>Physical Address</p>
      <p style={{ fontSize: "16px", marginTop: "0" }}>2101 Lake Tahoe Blvd</p>
      <p style={{ fontSize: "16px", marginTop: "0" }}>South Lake Tahoe, CA 96150</p>

      <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "15px", marginBottom: "5px" }}>Phone:</p>
      <p style={{ fontSize: "16px", marginTop: "0" }}>(530) 542-6160</p>

      <p style={{ fontWeight: "bold", fontSize: "18px", marginTop: "15px", marginBottom: "5px" }}>Hours</p>
      <p style={{ fontSize: "16px", marginTop: "0" }}>Monday - Friday</p>
      <p style={{ fontSize: "16px", marginTop: "0" }}>8:00 am - 5:00 pm</p>
    </div>
  );
};

export default ContactInfoBox;
