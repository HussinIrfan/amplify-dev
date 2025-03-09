"use client";

import * as React from "react";
import { useHonorsLogic } from "./HonorsLogic"; // Import the logic file
import { useCollapse } from "../../supportFunctions/ToggleCollase";
import "@aws-amplify/ui-react/styles.css";
import "../../page.module.css";
import "../admin.css";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function Honors() {
  const {
    honors,
    editingHonors,
    image,
    recipient,
    title,
    dateAwarded,
    description,
    setDescription,
    setImage,
    SetRecipient,
    setTitle,
    setDateAwarded,
    handleHonorSubmit,
    handleEditChangeHonor,
    handleSaveChangesHonor,
    handleEditToggleHonor,
    handleCancelEditHonor,
    deleteEntry,
    uploadPath,
  } = useHonorsLogic();

  const ref = React.useRef(null); // reset File Uploader

  return (
    <>
      <h3 className="admin-h3">Honors</h3>
      <table className="admin-about-us-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Honor</th>
            <th>Recipient</th>
            <th>Date Awarded</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {honors.map((honor) => {
            const editingHonor = editingHonors.get(honor.id) || honor;
            return (
              <tr key={honor.id}>
                <td>
                  <StorageImage
                    alt="No Image"
                    path={honor.recipientImage || "No Image"}
                  />
                </td>
                <td>
                  {editingHonors.has(honor.id) ? (
                    <input
                      type="text"
                      value={editingHonor.recipientName || ""}
                      required
                      onChange={(e) =>
                        handleEditChangeHonor(
                          honor.id,
                          "honorName",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    honor.recipientName
                  )}
                </td>
                <td>
                  {editingHonors.has(honor.id) ? (
                    <input
                      type="text"
                      value={editingHonor.title || ""}
                      onChange={(e) =>
                        handleEditChangeHonor(
                          honor.id,
                          "title",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    honor.title
                  )}
                </td>
                <td>
                  {editingHonors.has(honor.id) ? (
                    <input
                      type="text"
                      value={editingHonor.dateAwarded || ""}
                      onChange={(e) =>
                        handleEditChangeHonor(
                          honor.id,
                          "dateAwarded",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    honor.dateAwarded
                  )}
                </td>
                <td>
                  {editingHonors.has(honor.id) ? (
                    <input
                      type="text"
                      value={editingHonor.description || ""}
                      onChange={(e) =>
                        handleEditChangeHonor(
                          honor.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    honor.description
                  )}
                </td>
                <td>
                  {editingHonors.has(honor.id) ? (
                    <>
                      <button onClick={() => handleSaveChangesHonor(honor.id)}>
                        Save Changes
                      </button>
                      <button onClick={() => handleCancelEditHonor(honor.id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditToggleHonor(honor.id)}>
                        Edit
                      </button>
                      <button onClick={() => deleteEntry(honor.id)}>
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
      <form onSubmit={handleHonorSubmit} className="about-us-form">
        <h3 className="admin-h3">Add Honor</h3>
        <div className="form-group">
          <FileUploader
            acceptedFileTypes={["image/*"]}
            path={uploadPath}
            maxFileCount={1}
            autoUpload={false}
            isResumable
            ref={ref}
            onUploadSuccess={(file) => setImage(file.key || "")} // Assign file name or emtpy string if none
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Recipient</label>
          <input
            id="name"
            type="text"
            value={recipient}
            onChange={(e) => SetRecipient(e.target.value)}
            placeholder="Enter name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Award Title</label>
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
          <label htmlFor="description">Date Awarded</label>
          <input
            id="dateAwarded"
            type="date"
            value={dateAwarded}
            onChange={(e) => setDateAwarded(e.target.value)}
            placeholder="Enter description"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description (Optional)</label>
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
    </>
  );
}
