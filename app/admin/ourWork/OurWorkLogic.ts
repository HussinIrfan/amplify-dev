import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../../supportFunctions/SanitizeInput";
import { remove } from "aws-amplify/storage";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useOurWorkLogic() {
  const { sanitizeInput } = Sanitize();

  const [ourWorks, setOurWork] = useState<Array<Schema["ourWork"]["type"]>>([]);
  const [editingOurWorks, setEditingOurWorks] = useState<
    Map<string, Schema["ourWork"]["type"]>
  >(new Map());

  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [business, setBusiness] = useState("");
  const uploadPath = "ourWork/"; // S3 Bucket Location

  function listOurWork() {
    client.models.ourWork.observeQuery().subscribe({
      next: (data) =>
        setOurWork(
          [...data.items].sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        ),
      error: (err) => console.log(err),
    });
  }

  useEffect(() => {
    listOurWork();
  }, []);

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
      console.log("New entry created:", result);
      listOurWork();
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  function handleOurWorkSubmit(event: React.FormEvent) {
    event.preventDefault();
    createOurWorkEntry(picture, business, description);
    setPicture("");
    setBusiness("");
    setDescription("");
  }

  const handleEditChangeOurWork = (
    key: string,
    field: string,
    value: string
  ) => {
    const sanitizedValue = sanitizeInput(value);
    setEditingOurWorks((prev) => {
      const ourWork = prev.get(key);
      if (!ourWork || !ourWork.id) {
        throw new Error("Entry does not have a valid ID.");
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
          listOurWork();
          setEditingOurWorks((prev) => {
            const newEditing = new Map(prev);
            newEditing.delete(ourWorkId);
            return newEditing;
          });
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  const handleEditToggleOurWork = (ourWorkId: string) => {
    setEditingOurWorks((prev) => {
      const newEditing = new Map(prev);
      if (newEditing.has(ourWorkId)) {
        newEditing.delete(ourWorkId);
      } else {
        const toEdit = ourWorks.find((item) => item.id === ourWorkId);
        if (toEdit) {
          newEditing.set(ourWorkId, { ...toEdit });
        }
      }
      return newEditing;
    });
  };

  const handleCancelEditOurWork = (ourWorkId: string) => {
    setEditingOurWorks((prev) => {
      const newEditing = new Map(prev);
      newEditing.delete(ourWorkId);
      return newEditing;
    });
  };

  const handleDeleteOurWork = async (ourWorkId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const toDelete = ourWorks.find((item) => item.id === ourWorkId);
        if (!toDelete) return;

        if (toDelete.picture) {
          try {
            await remove({ path: toDelete.picture });
          } catch (error) {
            console.error("Error deleting image from S3:", error);
          }
        }

        await client.models.ourWork.delete({ id: ourWorkId });
        setOurWork((prev) => prev.filter((item) => item.id !== ourWorkId));
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  return {
    ourWorks,
    editingOurWorks,
    picture,
    description,
    business,
    uploadPath,
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
