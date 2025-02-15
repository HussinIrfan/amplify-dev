import * as React from "react";
import react, { useState } from "react";
import "./document.css";
import { useCollapse } from "@/app/supportFunctions/ToggleCollase";
import { FileUploader } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { StorageImage } from "@aws-amplify/ui-react-storage";

export default function adminDocuments() {
  const { isContentCollapsed, toggleCollapse } = useCollapse();
  const uploadPath = "Documents/";
  const ref = React.useRef(null); // reset File Uploader

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
              <div className="form-group">
                <FileUploader
                  acceptedFileTypes={[
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "text/plain",
                    "application/pdf",
                  ]}
                  path={uploadPath}
                  maxFileCount={10}
                  autoUpload={false}
                  isResumable
                  ref={ref}
                  onUploadSuccess={() => ref.current.clearFiles()}
                />
              </div>
            </>
          )}
          ;
        </div>
      </div>
    </>
  );
}
