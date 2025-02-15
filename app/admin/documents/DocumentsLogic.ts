import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../../supportFunctions/SanitizeInput";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useDocumentsLogic() {

    const [documents, setDocuments] = useState<Array<Schema["documents"]["type"]>>([]);
    const [doc501c3, setDoc501c3] = useState("");
    const [doc990, setDoc990] = useState("");



    return{
        documents,
        setDocuments
    };
}