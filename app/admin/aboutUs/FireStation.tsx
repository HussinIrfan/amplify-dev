"use client";

import * as React from "react";
import { useFireStationsLogic } from "./FireStationLogic"; // Import the logic file
import { useCollapse } from "../../supportFunctions/ToggleCollase";
import "@aws-amplify/ui-react/styles.css";
import blank from "../../global-images/blank-person.png";
import "../../page.module.css";
import "../admin.css";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function FireStations() {
  const {
    stations,
    editingStations,
    image,
    stationName,
    address,
    phone,
    setImage,
    setStationName,
    setAddress,
    setPhone,
    handleFireStationSubmit,
    handleEditChangeStation,
    handleSaveChangesStation,
    handleEditToggleStation,
    handleCancelEditStation,
    deleteEntry,
    uploadPath,
  } = useFireStationsLogic();

  const ref = React.useRef(null); // reset File Uploader

  return (
    <>
      <h3 className="admin-h3">Stations</h3>
      <table className="admin-about-us-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Station</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => {
            const editingStation = editingStations.get(station.id) || station;
            return (
              <tr key={station.id}>
                <td>
                  <StorageImage
                    alt="No Image"
                    path={station.image || "No Image"}
                  />
                </td>
                <td>
                  {editingStations.has(station.id) ? (
                    <input
                      type="text"
                      value={editingStation.stationName || ""}
                      required
                      onChange={(e) =>
                        handleEditChangeStation(
                          station.id,
                          "stationName",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    station.stationName
                  )}
                </td>
                <td>
                  {editingStations.has(station.id) ? (
                    <input
                      type="text"
                      value={editingStation.address || ""}
                      onChange={(e) =>
                        handleEditChangeStation(
                          station.id,
                          "address",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    station.address
                  )}
                </td>
                <td>
                  {editingStations.has(station.id) ? (
                    <input
                      type="tel"
                      placeholder="555-555-5555"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={editingStation.phone || ""}
                      onChange={(e) =>
                        handleEditChangeStation(
                          station.id,
                          "phone",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    station.phone
                  )}
                </td>
                <td>
                  {editingStations.has(station.id) ? (
                    <>
                      <button onClick={() => handleSaveChangesStation(station.id)}>
                        Save Changes
                      </button>
                      <button onClick={() => handleCancelEditStation(station.id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditToggleStation(station.id)}>
                        Edit
                      </button>
                      <button onClick={() => deleteEntry(station.id)}>
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
      <form onSubmit={handleFireStationSubmit} className="about-us-form">
        <h3 className="admin-h3">Add Station</h3>
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
          <label htmlFor="name">Station:</label>
          <input
            id="name"
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            placeholder="Enter name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Address: (Optional)</label>
          <input
            id="title"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter title"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Phone Number (Optional):</label>
          <input
            id="description"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
