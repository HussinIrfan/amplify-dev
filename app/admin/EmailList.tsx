"use client";

import { useEmailListLogic } from "./EmailListLogic"; // Import the logic file
import { useCollapse } from "../supportFunctions/ToggleCollase";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";

export default function EmailList() {
  const {
    emails,
    emailError,
    emailInput,
    setEmailInput,
    selectedEmails,
    emailSearchQuery,
    setEmailSearchQuery,
    handleSearchEmails,
    handleEmailSubmit,
    handleEmailCheckboxChange,
    handleBulkDeleteEmails,
    handleDeleteEmail,
  } = useEmailListLogic();

  const { isContentCollapsed, toggleCollapse } = useCollapse();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Email List{" "}
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? "collapsed" : ""
            }`}
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
        {isContentCollapsed && (
          <>
        {/* Container for emails with scroll */}
        <div className="email-list-parent">
          <div
            className="email-search-container"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={emailSearchQuery} // Use the emailSearchQuery state
              onChange={(e) => setEmailSearchQuery(e.target.value)} // Update search query state
              placeholder="Search by Email"
              style={{ marginRight: "10px" }}
            />
            <button
              onClick={handleSearchEmails}
              className="button"
              style={{ marginRight: "20px" }}
            >
              Search
            </button>
            <button className="deleteButton" onClick={handleBulkDeleteEmails}>
              Delete Selected
            </button>
          </div>
          <div className="email-list-container">
            {/* Search bar and delete button inline */}

            <table className="admin-about-us-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr key={email.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEmails.has(email.id)}
                        onChange={() => handleEmailCheckboxChange(email.id)}
                      />
                    </td>
                    <td>{email.email}</td>
                    <td>
                      <button onClick={() => handleDeleteEmail(email.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <div>
          <form onSubmit={handleEmailSubmit} className="add-email-form">
            <div className="form-group">
              <label className="admin-h3" htmlFor="email">
                Add Email
              </label>
              <input
                id="email"
                type="text"
                value={emailInput} // Use the emailInput state
                onChange={(e) => setEmailInput(e.target.value)} // Update emailInput state
                placeholder="Enter Email Address"
                className="form-input"
              />
            </div>
            <button type="submit" className="button">
              Create Entry
            </button>
          </form>
        </div>
        </>
        )}
      </div>
    </>
  );
}
