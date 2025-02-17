import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../../supportFunctions/SanitizeInput";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export function useDocumentsLogic() {
  const [documents, setDocuments] = useState<
    Array<Schema["documents"]["type"]>
  >([]);
  const [uploadDoc501c3, setDoc501c3] = useState("");
  const [uploadDoc990, setDoc990] = useState("");
  const DocId = "2"; // Static table id value for updating

  useEffect(() => {
    const fetchDocStatus = async () => {
      try {
        // Fetch entry with ID "2"
        const response = await client.models.documents.get({ id: DocId });
        if (response.data) {
          setDoc501c3(response.data.doc501c3 ?? ""); // Default to blank if no value
          setDoc990(response.data.doc990 ?? "");
        }
      } catch (err) {
        console.error("Error fetching document status:", err);
      }
    };
    fetchDocStatus();
  }, []);

  const updateDoc990 = async (doc: string) => {
    try {
      const result = await client.models.documents.update({
        id: DocId,
        doc501c3: uploadDoc501c3,
        doc990: doc,
      });
      return result;
    } catch (err) {
      console.error("Error creating document: ", err);
    }
  };
  const updateDoc501c3 = async (doc: string) => {
    try {
      const result = await client.models.documents.update({
        id: DocId,
        doc501c3: doc,
        doc990: uploadDoc990,
      });
      return result;
    } catch (err) {
      console.error("Error creating document: ", err);
    }
  };

  return {
    documents,
    uploadDoc501c3,
    uploadDoc990,
    setDoc990,
    setDoc501c3,
    setDocuments,
    updateDoc990,
    updateDoc501c3,
  };
}
