"use client";

import { useAboutUsLogic } from "./AboutUsLogic"; // Import the logic file
import { useCollapse } from "../supportFunctions/ToggleCollase";
import blankImage from "../global-images/blank-person.png";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";

export default function AboutUs() {
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
    handleEditChangeEmp,
    handleSaveChangesEmp,
    handleEditToggleEmp,
    handleCancelEditEmp,
    deleteEntry,
  } = useAboutUsLogic();

  const { isContentCollapsed, toggleCollapse} = useCollapse();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          About Us{" "}
          <span
            className={`dropdown-arrow ${isContentCollapsed ? ".collapsed" : ""}`}
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

        {/* Collapsible Section */}
        {isContentCollapsed && (
          <>
            <br />
            <h3 className="admin-h3">Team Members</h3>
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
                              handleEditChangeEmp(emp.id, "picture", e.target.value)
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
                              handleEditChangeEmp(emp.id, "name", e.target.value)
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
                              handleEditChangeEmp(emp.id, "title", e.target.value)
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
                              handleEditChangeEmp(emp.id, "description", e.target.value)
                            }
                          />
                        ) : (
                          emp.description
                        )}
                      </td>
                      <td>
                        {editingEmps.has(emp.id) ? (
                          <>
                            <button onClick={() => handleSaveChangesEmp(emp.id)}>
                              Save Changes
                            </button>
                            <button onClick={() => handleCancelEditEmp(emp.id)}>
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEditToggleEmp(emp.id)}>
                              Edit
                            </button>
                            <button onClick={() => deleteEntry(emp.id)}>
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
            <br />
            <form onSubmit={handleAboutUsSubmit} className="about-us-form">
              <h3 className="admin-h3">Add Team Member</h3>
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
                <label htmlFor="description">Description (Optional):</label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="form-input"
                />
              </div>
              <button type="submit" className="button">
                Create Entry
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
