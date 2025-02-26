"use client";

import * as React from "react";
import react, { useState } from "react";
import "./document.css";
import { useDocumentsLogic } from "./DocumentsLogic";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function adminDocuments() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const uploadPath = "Documents/";
  const ref = React.useRef(null); // reset File Uploader

  //Documents Logic functions
  const {
    documents,
    uploadDoc501c3,
    uploadDoc990,
    setDoc990,
    setDoc501c3,
    setDocuments,
    updateDoc990,
    updateDoc501c3,
  } = useDocumentsLogic();

  return (
    <>
      <div className="div">
        <h2 className="admin-h2" onClick={toggleCollapse}>
          Documents{" "}
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
        <div
          className={`collapsible-content ${
            !isContentCollapsed ? "collapsed" : "expanded"
          }`}
        >
          {isContentCollapsed && (
            <>
              <div className="form-group-document">
                <p>Upload 501(c)3 Here</p>
                <FileUploader
                  // Only accept document type files
                  acceptedFileTypes={[
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                    "application/pdf",
                  ]}
                  path={uploadPath}
                  maxFileCount={1}
                  autoUpload={false}
                  isResumable
                  ref={ref}
                  onUploadSuccess={(file) => {
                    updateDoc501c3(file.key || "");
                    (ref.current as any).clearFiles();
                  }}
                />
              </div>
              <br />
              <p>Upload 990 Here</p>
              <div className="form-group-document">
                <FileUploader
                  // Only accept document type files
                  acceptedFileTypes={[
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                    "application/pdf",
                  ]}
                  path={uploadPath}
                  maxFileCount={1}
                  autoUpload={false}
                  isResumable
                  ref={ref}
                  onUploadSuccess={(file) => {
                    updateDoc990(file.key || "");
                    (ref.current as any).clearFiles();
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
