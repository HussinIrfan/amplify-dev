import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { remove } from "aws-amplify/storage";
import { getUrl } from 'aws-amplify/storage';
import { Sanitize } from "../../supportFunctions/SanitizeInput";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export function useDocumentsLogic() {
  const [documents, setDocuments] = useState<
  Array<Schema["documents"]["type"]>
  >([]);
  const [uploadDoc501c3, setDoc501c3] = useState("");
  const [uploadDoc501c3Name, setDoc501c3Name] = useState("");
  const [uploadDoc990, setDoc990] = useState("");
  const [uploadDoc990Name, setDoc990Name] = useState("");
  const [url501c3, setUrl501c3] = useState("");
  const [url990, setUrl990] = useState("");
  const DocId = "2"; // Static table id value for updating
  const uploadPath = "Documents/";

  useEffect(() => {
    const fetchDocStatus = async () => {
      try {
        // Fetch entry with ID "2"
        const response = await client.models.documents.get({ id: DocId });
    
        if (response.data) {
          setDoc501c3(response.data.doc501c3 ?? ""); // Default to blank if no value
          setDoc990(response.data.doc990 ?? "");
          
          // Check if uploadDoc501c3 is not empty before calling createDocName
          if (uploadDoc501c3) {
            const name1 = await createDocName(uploadDoc501c3);
            setDoc501c3Name(name1);
          }
    
          // Check if uploadDoc501c3 is not empty or undefined before calling getUrl
          if (uploadDoc501c3) {
            const url1 = await getUrl({ path: uploadDoc501c3 });
            setUrl501c3(url1.url.toString());
          } else {
            setUrl501c3(""); // Set a fallback value
          }
    
          // Check if uploadDoc990 is not empty before calling createDocName
          if (uploadDoc990) {
            const name2 = await createDocName(uploadDoc990);
            setDoc990Name(name2);
          }
    
          // Check if uploadDoc990 is not empty or undefined before calling getUrl
          if (uploadDoc990) {
            const url2 = await getUrl({ path: uploadDoc990 });
            setUrl990(url2.url.toString());
          } else {
            setUrl990(""); // Set a fallback value
          }
    
        } else {
          const initialData = {
            id: DocId,
            doc501c3: "",
            doc990: "",
          };
    
          const createInitialData = await client.models.documents.create(initialData);
          setDoc501c3("");
          setDoc990("");
        }
      } catch (err) {
        console.error("Error fetching document status:", err);
      }
    };
    fetchDocStatus();
  }, [uploadDoc501c3, uploadDoc990]); // Adding uploadDoc501c3 as a dependency to ensure useEffect runs after it's updated
  

  //TODO: remove old file before updating new files
  const updateDoc990 = async (doc: string) => {
    try {
      const result = await client.models.documents.update({
        id: DocId,
        doc990: doc,
      });
      // Only remove old file if the path exists
      if (uploadDoc990) {
        await remove({ path: uploadDoc990 });
      }
      setDoc990(doc);
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
      });
      // Only remove old file if the path exists
      if (uploadDoc501c3) {
        await remove({ path: uploadDoc501c3 });
      }
      setDoc501c3(doc);
      return result;
    } catch (err) {
      console.error("Error creating document: ", err);
    }
  };

  // Modified createDocName function
  const createDocName = async (doc: string) => {
    const docName = doc.startsWith(uploadPath) ? doc.replace(uploadPath, "") : doc;
    console.log(`Created document name: ${docName}`);  // Log the created name
    return docName;
  };

  
  

  return {
    documents,
    uploadDoc501c3,
    uploadDoc990,
    url501c3,
    url990,
    uploadPath,
    uploadDoc501c3Name,
    uploadDoc990Name,
    setDoc990Name,
    setDoc501c3Name,
    setUrl990,
    setUrl501c3,
    setDoc990,
    setDoc501c3,
    setDocuments,
    updateDoc990,
    updateDoc501c3,
  };
}
