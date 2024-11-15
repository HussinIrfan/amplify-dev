"use client";

import { useOurWorkLogic } from "./OurWorkLogic"; // Import the logic file
import { useCollapse } from "../supportFunctions/ToggleCollase";
import blankImage from "../global-images/blank-person.png";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css";
import "./admin.css";

export default function OurWork() {
  const {
    ourWorks,
    editingOurWorks,
    picture,
    description,
    business,
    setPicture,
    setDescription,
    setBusiness,
    handleEditChangeOurWork,
    handleSaveChangesOurWork,
    handleEditToggleOurWork,
    handleCancelEditOurWork,
    handleDeleteOurWork,
    handleOurWorkSubmit,
  } = useOurWorkLogic();

  const { isContentCollapsed, toggleCollapse } = useCollapse();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Our Work{" "}
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
        {/* Collapsible Section */}
        {isContentCollapsed && (
          <>
            <h3 className="admin-h3">Current Business / Organizations</h3>
            <table className="admin-about-us-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Business</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ourWorks.map((ourWork) => {
                  const editingourWork =
                    editingOurWorks.get(ourWork.id) || ourWork;
                  return (
                    <tr key={ourWork.id}>
                      <td>
                        {editingOurWorks.has(ourWork.id) ? (
                          <input
                            type="text"
                            value={editingourWork.picture || ""}
                            onChange={(e) =>
                              handleEditChangeOurWork(
                                ourWork.id,
                                "picture",
                                e.target.value
                              )
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
                        {editingOurWorks.has(ourWork.id) ? (
                          <input
                            type="text"
                            value={editingourWork.business || ""}
                            onChange={(e) =>
                              handleEditChangeOurWork(
                                ourWork.id,
                                "business",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          ourWork.business
                        )}
                      </td>
                      <td>
                        {editingOurWorks.has(ourWork.id) ? (
                          <input
                            type="text"
                            value={editingourWork.description || ""}
                            onChange={(e) =>
                              handleEditChangeOurWork(
                                ourWork.id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          ourWork.description
                        )}
                      </td>
                      <td>
                        {editingOurWorks.has(ourWork.id) ? (
                          <>
                            <button
                              onClick={() =>
                                handleSaveChangesOurWork(ourWork.id)
                              }
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={() =>
                                handleCancelEditOurWork(ourWork.id)
                              }
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEditToggleOurWork(ourWork.id)
                              }
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteOurWork(ourWork.id)}
                            >
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
            <form onSubmit={handleOurWorkSubmit} className="about-us-form">
              <h3 className="admin-h3">Add Business</h3>
              <div className="form-group">
                <label htmlFor="pictures">Picture URL:</label>
                <input
                  id="picture"
                  type="text"
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                  placeholder="Enter Picture URL"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="business">Business:</label>
                <input
                  id="business"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Enter in Business name"
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
