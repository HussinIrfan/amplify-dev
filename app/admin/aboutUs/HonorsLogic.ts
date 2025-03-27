import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../../supportFunctions/SanitizeInput";
import { remove } from "aws-amplify/storage";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useHonorsLogic() {
  const { sanitizeInput } = Sanitize();

  const [honors, setHonor] = useState<Array<Schema["Honor"]["type"]>>([]);
  const [editingHonors, setEditingHonors] = useState<
    Map<string, Schema["Honor"]["type"]>
  >(new Map());

  const [image, setImage] = useState("");
  const [recipient, SetRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [dateAwarded, setDateAwarded] = useState("");
  const [description, setDescription] = useState("");
  const uploadPath = "about-us-founders/"; //S3 Bucket Location TODO, Change at Deployment

 // Function to list existing "About Us" entries
function listHonors() {
  client.models.Honor.observeQuery().subscribe({
    next: (data) =>
      setHonor(
        [...data.items].sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
      ),
    error: (err) => console.log(err),
  });
}
  // UseEffect to fetch initial data
  useEffect(() => {
    listHonors();
  }, []);

  // Function to create a new About Us entry
  async function createHonorsEntry(
    recipientImage: string,
    recipientName: string,
    title: string,
    dateAwarded: string,
    description: string,
  ) {
    try {
      const result = await client.models.Honor.create({
        title,
        description,
        recipientName,
        dateAwarded,
        recipientImage,
      });
      console.log("New entry created:", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  // Submit handler for creating new About Us entry
  function handleHonorSubmit(event: React.FormEvent) {
    event.preventDefault();
    createHonorsEntry(
      image,
      title,
      recipient,
      dateAwarded,
      description,
    );
    setImage("");
    SetRecipient("");
    setTitle("");
    setDateAwarded("");
    setDescription("");
  }

  // Handle changes made in the editing form
  const handleEditChangeHonor = (key: string, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setEditingHonors((prev) => {
      const honor = prev.get(key);
      if (!honor || !honor.id) {
        throw new Error("Honorloyee does not have a valid ID.");
      }
      const updatedHonor = { ...honor, [field]: sanitizedValue };
      const newMap = new Map(prev);
      newMap.set(key, updatedHonor);
      return newMap;
    });
  };

  // Handle saving all the edits to the database
  const handleSaveChangesHonor = async (honorId: string) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      try {
        const updatedHonor = editingHonors.get(honorId);
        if (updatedHonor) {
          await client.models.Honor.update(updatedHonor);
          console.log("Changes saved successfully");
          listHonors(); // Refresh the list of honorloyees from the database
          // Close the edit box after saving changes
          setEditingHonors((prev) => {
            const newEditingHonors = new Map(prev);

            newEditingHonors.delete(honorId); // Remove the honorloyee from the editing state
            return newEditingHonors;
          });
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  // Function to handle edit toggle
  const handleEditToggleHonor = (honorId: string) => {
    setEditingHonors((prev) => {
      const newEditingHonors = new Map(prev);
      if (newEditingHonors.has(honorId)) {
        newEditingHonors.delete(honorId); // Toggle off
      } else {
        const honorToEdit = honors.find((honor) => honor.id === honorId);
        if (honorToEdit) {
          newEditingHonors.set(honorId, { ...honorToEdit }); // Set to edit mode
        }
      }
      return newEditingHonors;
    });
  };

  // Function to cancel the editing
  const handleCancelEditHonor = (honorId: string) => {
    setEditingHonors((prev) => {
      const newEditingHonors = new Map(prev);
      newEditingHonors.delete(honorId); // Cancel the editing mode
      return newEditingHonors;
    });
  };

  // Function to delete an About Us entry
  const deleteEntry = async (honorId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const honorToDelete = honors.find((honor) => honor.id === honorId); //find honor to delete using strict compare

        if (!honorToDelete) {
          console.log("Unable to find honor");
          return;
        }

        //remove S3 image Object
        if (honorToDelete.recipientImage) {
          try {
            await remove({
              path: honorToDelete.recipientImage,
              // add bucket path specification if needed here
            });
          } catch (error) {
            console.log(`Error deleting S3 bucket Object ${honorId}`);
          }
        }

        const result = await client.models.Honor.delete({ id: honorId });

        if (result) {
          console.log(`Entry with ID ${honorId} deleted successfully.`);

          // Optionally, update the local state immediately to reflect the changes
          setHonor((prevHonors) => prevHonors.filter((honor) => honor.id !== honorId));
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  return {
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
  };
}
