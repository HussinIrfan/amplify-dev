"use client";

import { useAdminLogic } from "./adminLogic"; // Import the logic file
import CustomNavbar from "../CustomNavbar";
import blankImage from "../global-images/blank-person.png";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";

export default function AdminPage() {
  const {
    emps,
    editingEmps,
    picture,
    name,
    title,
    description,
    setPicture,
    setName,
    setTitle,
    setDescription,
    handleAboutUsSubmit,
    handleEditChange,
    handleSaveChanges,
    handleEditToggle,
    handleCancelEdit,
    deleteAboutUsEntry,
    emails, // Get emails from the hook
    handleEmailSubmit, // Handle email submission
    emailError, // To show any errors related to email
    emailInput, // The input state for email
    setEmailInput, // To update the email input field
  } = useAdminLogic(); // Destructure from the hook

  return (
    <main className="main">
      <CustomNavbar />
      <div>
        <h1 className="admin-h1"> Admin Settings</h1>
      </div>
      <div className="div">
        <h2 className="admin-h2"> About Us </h2>
        <form onSubmit={handleAboutUsSubmit} className="about-us-form">
          <div className="form-group">
            <label htmlFor="picture">Picture URL:</label>
            <input
              id="picture"
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              placeholder="Enter picture URL"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="form-input"
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Create Entry
          </button>
        </form>
        <br />

        {/* Table to display "About Us" entries */}
        <table className="admin-about-us-table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => {
              const editingEmp = editingEmps.get(emp.id) || emp;
              return (
                <tr key={emp.id}>
                  <td>
                    {editingEmps.has(emp.id) ? (
                      <input
                        type="text"
                        value={editingEmp.picture || ""}
                        onChange={(e) =>
                          handleEditChange(emp.id, "picture", e.target.value)
                        }
                      />
                    ) : (
                      <img
                        className="admin-aboutUs-image"
                        src={blankImage.src}
                        alt="About Us"
                      />
                    )}
                  </td>
                  <td>
                    {editingEmps.has(emp.id) ? (
                      <input
                        type="text"
                        value={editingEmp.name || ""}
                        onChange={(e) =>
                          handleEditChange(emp.id, "name", e.target.value)
                        }
                      />
                    ) : (
                      emp.name
                    )}
                  </td>
                  <td>
                    {editingEmps.has(emp.id) ? (
                      <input
                        type="text"
                        value={editingEmp.title || ""}
                        onChange={(e) =>
                          handleEditChange(emp.id, "title", e.target.value)
                        }
                      />
                    ) : (
                      emp.title
                    )}
                  </td>
                  <td>
                    {editingEmps.has(emp.id) ? (
                      <input
                        type="text"
                        value={editingEmp.description || ""}
                        onChange={(e) =>
                          handleEditChange(
                            emp.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      emp.description
                    )}
                  </td>
                  <td>
                    {editingEmps.has(emp.id) ? (
                      <>
                        <button onClick={() => handleSaveChanges(emp.id)}>
                          Save Changes
                        </button>
                        <button onClick={() => handleCancelEdit(emp.id)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEditToggle(emp.id)}>
                          Edit
                        </button>
                        <button onClick={() => deleteAboutUsEntry(emp.id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <div className="div">
        <h2 className="admin-h2"> Email List </h2>
        <form onSubmit={handleEmailSubmit} className="about-us-form">
          <div className="form-group">
            <label htmlFor="email">Add Email</label>
            <input
              id="email"
              type="text"
              value={emailInput} // Use the emailInput state
              onChange={(e) => setEmailInput(e.target.value)} // Update emailInput state
              placeholder="Enter Email Address"
              className="form-input"
            />
          </div>
          <button type="submit" className="form-submit-btn">
            Create Entry
          </button>
        </form>

        {/* Container for emails with scroll */}
        <div className="email-list-container">
          <table className="admin-about-us-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id}>
                  <td>{email.email}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
