import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../supportFunctions/SanitizeInput";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useOurWorkLogic() {
  const [ourWorks, setOurWork] = useState<Array<Schema["ourWork"]["type"]>>([]);
  const [editingOurWorks, setEditingOurWorks] = useState<
    Map<string, Schema["ourWork"]["type"]>>(new Map());
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [business, setBusiness] = useState("");
  const { sanitizeInput } = Sanitize();

  // Function to list existing "About Us" entries
  function listOurWork() {
    client.models.ourWork.observeQuery().subscribe({
      next: (data) => setOurWork([...data.items]),
      error: (err) => console.log(err),
    });
  }

  // UseEffect to fetch initial data
  useEffect(() => {
    listOurWork(); // Fetch emails from the Subscribers table
  }, []);

  const handleEditChangeOurWork = (
    key: string,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    setEditingOurWorks((prev) => {
      const ourWork = prev.get(key);
      if (!ourWork || !ourWork.id) {
        throw new Error("Employee does not have a valid ID.");
      }
      const updatedOurWork = { ...ourWork, [field]: sanitizedValue };
      const newMap = new Map(prev);
      newMap.set(key, updatedOurWork);
      return newMap;
    });
  };

  const handleSaveChangesOurWork = async (ourWorkId: string) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      try {
        const updatedOurWork = editingOurWorks.get(ourWorkId);
        if (updatedOurWork) {
          await client.models.ourWork.update(updatedOurWork);
          console.log("Changes saved successfully");
          listOurWork(); // Refresh the list of employees from the database
          // Close the edit box after saving changes
          setEditingOurWorks((prev) => {
            const newEditingOurWorks = new Map(prev);
            newEditingOurWorks.delete(ourWorkId); // Remove the employee from the editing state
            return newEditingOurWorks;
          });
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handleEditToggleOurWork = (ourWorkId: string) => {
    setEditingOurWorks((prev) => {
      const newEditingOurWorks = new Map(prev);
      if (newEditingOurWorks.has(ourWorkId)) {
        newEditingOurWorks.delete(ourWorkId); // Toggle off
      } else {
        const ourWorkToEdit = ourWorks.find(
          (ourWork) => ourWork.id === ourWorkId
        );
        if (ourWorkToEdit) {
          newEditingOurWorks.set(ourWorkId, { ...ourWorkToEdit }); // Set to edit mode
        }
      }
      return newEditingOurWorks;
    });
  };

  // Function to cancel the editing of Our Work
  const handleCancelEditOurWork = (ourWorkId: string) => {
    setEditingOurWorks((prev) => {
      const newEditingOurWorks = new Map(prev);
      newEditingOurWorks.delete(ourWorkId); // Cancel the editing mode
      return newEditingOurWorks;
    });
  };

  const handleDeleteOurWork = async (ourWorkId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const result = await client.models.ourWork.delete({ id: ourWorkId });

        if (result) {
          console.log(
            `Our Work item with ID ${ourWorkId} deleted successfully.`
          );
        }
        setOurWork((prevOurWork) =>
          prevOurWork.filter((ourWork) => ourWork.id !== ourWorkId)
        );
      } catch (error) {
        console.error("Error deleting Our Work item:", error);
      }
    }
  };

  function handleOurWorkSubmit(event: React.FormEvent) {
    event.preventDefault();
    createOurWorkEntry(picture, business, description);
    setPicture("");
    setBusiness("");
    setDescription("");
  }

  async function createOurWorkEntry(
    picture: string,
    business: string,
    description: string
  ) {
    try {
      const result = await client.models.ourWork.create({
        picture,
        business,
        description,
      });
      console.log("New entry created", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  return {
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
  };
}
