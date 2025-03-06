"use client";

import * as React from "react";
import { useAboutUsLogic } from "./AboutUsLogic"; // Import the logic file
import { useCollapse } from "../../supportFunctions/ToggleCollase";
import "@aws-amplify/ui-react/styles.css";
import blank from "../../global-images/blank-person.png";
import "../../page.module.css";
import "../admin.css";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import FireStations from "./FireStation";
import Honors from "./Honors";

export default function AboutUs() {
  const {
    emps,
    editingEmps,
    picture,
    name,
    title,
    description,
    uploadPath,
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

  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const blankImage = blank;
  const ref = React.useRef(null); // reset File Uploader

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          About Us{" "}
          <span
            className={`dropdown-arrow ${
              isContentCollapsed ? ".collapsed" : ""
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

        {/* Collapsible Section */}
        <div
          className={`collapsible-content ${
            !isContentCollapsed ? "collapsed" : "expanded"
          }`}
        >
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
                          <StorageImage
                            alt="No Image"
                            path={emp.picture || "No Image"}
                          />
                        </td>
                        <td>
                          {editingEmps.has(emp.id) ? (
                            <input
                              type="text"
                              value={editingEmp.name || ""}
                              onChange={(e) =>
                                handleEditChangeEmp(
                                  emp.id,
                                  "name",
                                  e.target.value
                                )
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
                                handleEditChangeEmp(
                                  emp.id,
                                  "title",
                                  e.target.value
                                )
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
                                handleEditChangeEmp(
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
                              <button
                                onClick={() => handleSaveChangesEmp(emp.id)}
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => handleCancelEditEmp(emp.id)}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditToggleEmp(emp.id)}
                              >
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
                  <FileUploader
                    acceptedFileTypes={["image/*"]}
                    path={uploadPath}
                    maxFileCount={1}
                    autoUpload={false}
                    isResumable
                    ref={ref}
                    onUploadSuccess={(file) => setPicture(file.key || "")} // Assign file name or emtpy string if none
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
                <button
                  type="submit"
                  className="button"
                  onClick={() => (ref.current as any).clearFiles()}
                >
                  Create Entry
                </button>
              </form>
              <br />
              <hr
                style={{
                  border: "none",
                  height: "10px",
                  backgroundColor: "black",
                  margin: "0",
                }}
              />
              <FireStations />
              <br />
              <hr
                style={{
                  border: "none",
                  height: "10px",
                  backgroundColor: "black",
                  margin: "0",
                }}
              />
              <Honors />
            </>
          )}
        </div>
      </div>
    </>
  );
}
