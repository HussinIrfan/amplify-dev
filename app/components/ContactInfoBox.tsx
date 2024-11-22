import React from "react";

const ContactInfoBox = () => {
  return (
    <div style={{ backgroundColor: "black", color: "white", padding: "20px", margin: "20px 0", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
        {/* Physical Address */}
        <div>
          <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>Physical Address</p>
          <p style={{ fontSize: "16px", marginTop: "0", marginBottom: "5px" }}>2101 Lake Tahoe Blvd</p>
          <p style={{ fontSize: "16px", marginTop: "0" }}>South Lake Tahoe, CA 96150</p>
        </div>

        {/* Phone */}
        <div>
          <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>Phone:</p>
          <p style={{ fontSize: "16px", marginTop: "0" }}>(530) 542-6160</p>
        </div>

        {/* Hours */}
        <div>
          <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "5px" }}>Hours</p>
          <p style={{ fontSize: "16px", marginTop: "0", marginBottom: "5px" }}>Monday - Friday</p>
          <p style={{ fontSize: "16px", marginTop: "0" }}>8:00 am - 5:00 pm</p>
        </div>
      </div>

      {/* Hidden Button */}
      <button 
        style={{ 
          display: "none" // This hides the button
        }}
        onClick={() => alert("Hidden Button Clicked!")} 
      >
        Hidden Button
      </button>
    </div>
  );
};

export default ContactInfoBox;
