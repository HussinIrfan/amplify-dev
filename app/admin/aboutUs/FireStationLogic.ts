import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Sanitize } from "../../supportFunctions/SanitizeInput";
import { remove } from "aws-amplify/storage";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useFireStationsLogic() {
  const { sanitizeInput } = Sanitize();

  const [stations, setStation] = useState<Array<Schema["FireStation"]["type"]>>([]);
  const [editingStations, setEditingStations] = useState<
    Map<string, Schema["FireStation"]["type"]>
  >(new Map());

  const [image, setImage] = useState("");
  const [stationName, setStationName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const uploadPath = "about-us-founders/"; //S3 Bucket Location TODO, Change at Deployment

  // Function to list existing "About Us" entries
  function listFireStations() {
    client.models.FireStation.observeQuery().subscribe({
      next: (data) => setStation([...data.items]),
      error: (err) => console.log(err),
    });
  }

  // UseEffect to fetch initial data
  useEffect(() => {
    listFireStations();
  }, []);

  // Function to create a new About Us entry
  async function createFireStationsEntry(
    image: string,
    stationName: string,
    address: string,
    phone: string
  ) {
    try {
      const result = await client.models.FireStation.create({
        image,
        stationName,
        address,
        phone,
      });
      console.log("New entry created:", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  // Submit handler for creating new About Us entry
  function handleFireStationSubmit(event: React.FormEvent) {
    event.preventDefault();
    createFireStationsEntry(image, stationName, address, phone);
    setImage("");
    setStationName("");
    setAddress("");
    setPhone("");
  }

  // Handle changes made in the editing form
  const handleEditChangeStation = (key: string, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setEditingStations((prev) => {
      const station = prev.get(key);
      if (!station || !station.id) {
        throw new Error("Stationloyee does not have a valid ID.");
      }
      const updatedStation = { ...station, [field]: sanitizedValue };
      const newMap = new Map(prev);
      newMap.set(key, updatedStation);
      return newMap;
    });
  };

  // Handle saving all the edits to the database
  const handleSaveChangesStation = async (stationId: string) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      try {
        const updatedStation = editingStations.get(stationId);
        if (updatedStation) {
          await client.models.FireStation.update(updatedStation);
          console.log("Changes saved successfully");
          listFireStations(); // Refresh the list of stationloyees from the database
          // Close the edit box after saving changes
          setEditingStations((prev) => {
            const newEditingStations = new Map(prev);

            newEditingStations.delete(stationId); // Remove the stationloyee from the editing state
            return newEditingStations;
          });
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  // Function to handle edit toggle
  const handleEditToggleStation = (stationId: string) => {
    setEditingStations((prev) => {
      const newEditingStations = new Map(prev);
      if (newEditingStations.has(stationId)) {
        newEditingStations.delete(stationId); // Toggle off
      } else {
        const stationToEdit = stations.find((station) => station.id === stationId);
        if (stationToEdit) {
          newEditingStations.set(stationId, { ...stationToEdit }); // Set to edit mode
        }
      }
      return newEditingStations;
    });
  };

  // Function to cancel the editing
  const handleCancelEditStation = (stationId: string) => {
    setEditingStations((prev) => {
      const newEditingStations = new Map(prev);
      newEditingStations.delete(stationId); // Cancel the editing mode
      return newEditingStations;
    });
  };

  // Function to delete an About Us entry
  const deleteEntry = async (stationId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const stationToDelete = stations.find((station) => station.id === stationId); //find station to delete using strict compare

        if (!stationToDelete) {
          console.log("Unable to find station");
          return;
        }

        //remove S3 image Object
        if (stationToDelete.image) {
          try {
            await remove({
              path: stationToDelete.image,
              // add bucket path specification if needed here
            });
          } catch (error) {
            console.log(`Error deleting S3 bucket Object ${stationId}`);
          }
        }

        const result = await client.models.FireStation.delete({ id: stationId });

        if (result) {
          console.log(`Entry with ID ${stationId} deleted successfully.`);

          // Optionally, update the local state immediately to reflect the changes
          setStation((prevStations) => prevStations.filter((station) => station.id !== stationId));
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  return {
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
  };
}
