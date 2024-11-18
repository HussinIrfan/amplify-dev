import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useAdminLogic() {
  // Set listing variables
  const [emps, setEmp] = useState<Array<Schema["aboutUs"]["type"]>>([]);
  const [editingEmps, setEditingEmps] = useState<
    Map<string, Schema["aboutUs"]["type"]>
  >(new Map());

  //Emails
  const [emails, setEmail] = useState<Array<Schema["Subscribers"]["type"]>>([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // About Us form state
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Function to list existing "About Us" entries
  function listAboutUs() {
    client.models.aboutUs.observeQuery().subscribe({
      next: (data) => setEmp([...data.items]),
      error: (err) => console.log(err),
    });
  }

  // Function to list existing "Email List" entries from Subscribers table
  function listEmails() {
    client.models.Subscribers.observeQuery().subscribe({
      next: (data) => setEmail([...data.items]),
      error: (err) => console.log(err),
    });
  }

  // UseEffect to fetch initial data
  useEffect(() => {
    listAboutUs();
    listEmails(); // Fetch emails from the Subscribers table
  }, []);

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError("Invalid email format.");
      return;
    }

    // Check if email already exists
    const existingEmails = emails.filter((email) => email.email === emailInput);
    if (existingEmails.length > 0) {
      setEmailError("Email already subscribed.");
      return;
    }

    try {
      // Create new subscriber entry
      const newSubscriber = await client.models.Subscribers.create({
        email: emailInput,
      });
      console.log("Successfully added new subscriber:", newSubscriber);

      // Clear the input and error state
      setEmailInput("");
      setEmailError(null);

      // Refresh the email list
      listEmails();
    } catch (error) {
      console.error("Error adding subscriber:", error);
      setEmailError("Error adding subscriber to the database.");
    }
  };

  // Function to create a new About Us entry
  async function createAboutUsEntry(
    picture: string,
    name: string,
    title: string,
    description: string
  ) {
    try {
      const result = await client.models.aboutUs.create({
        picture,
        name,
        title,
        description,
      });
      console.log("New entry created:", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  // Submit handler for creating new About Us entry
  function handleAboutUsSubmit(event: React.FormEvent) {
    event.preventDefault();
    createAboutUsEntry(picture, name, title, description);
    setPicture("");
    setName("");
    setTitle("");
    setDescription("");
  }

  // Handle changes made in the editing form
  const handleEditChange = (key: string, field: string, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setEditingEmps((prev) => {
      const emp = prev.get(key);
      if (!emp || !emp.id) {
        throw new Error("Employee does not have a valid ID.");
      }
      const updatedEmp = { ...emp, [field]: sanitizedValue };
      const newMap = new Map(prev);
      newMap.set(key, updatedEmp);
      return newMap;
    });
  };

  // Sanitize inputs to prevent dangerous characters (basic SQL injection prevention)
  const sanitizeInput = (input: string) => {
    return input.replace(/['"\\;-]/g, ""); // Remove dangerous characters
  };

  // Handle saving all the edits to the database
  const handleSaveChanges = async (empId: string) => {
    if (window.confirm("Are you sure you want to save changes?")) {
      try {
        const updatedEmp = editingEmps.get(empId);
        if (updatedEmp) {
          await client.models.aboutUs.update(updatedEmp);
          console.log("Changes saved successfully");
          listAboutUs(); // Refresh the list of employees from the database
          // Close the edit box after saving changes
          setEditingEmps((prev) => {
            const newEditingEmps = new Map(prev);
            newEditingEmps.delete(empId); // Remove the employee from the editing state
            return newEditingEmps;
          });
        }
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  // Function to handle edit toggle
  const handleEditToggle = (empId: string) => {
    setEditingEmps((prev) => {
      const newEditingEmps = new Map(prev);
      if (newEditingEmps.has(empId)) {
        newEditingEmps.delete(empId); // Toggle off
      } else {
        const empToEdit = emps.find((emp) => emp.id === empId);
        if (empToEdit) {
          newEditingEmps.set(empId, { ...empToEdit }); // Set to edit mode
        }
      }
      return newEditingEmps;
    });
  };

  // Function to cancel the editing
  const handleCancelEdit = (empId: string) => {
    setEditingEmps((prev) => {
      const newEditingEmps = new Map(prev);
      newEditingEmps.delete(empId); // Cancel the editing mode
      return newEditingEmps;
    });
  };

  // Function to delete an About Us entry
  const deleteAboutUsEntry = async (empId: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        // Here we pass an object with an `id` key, not just a string
        const result = await client.models.aboutUs.delete({ id: empId });

        if (result) {
          console.log(`Entry with ID ${empId} deleted successfully.`);

          // Optionally, update the local state immediately to reflect the changes
          setEmp((prevEmps) => prevEmps.filter((emp) => emp.id !== empId));
        }
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    }
  };

  return {
    emps,
    editingEmps,
    picture,
    name,
    title,
    description,
    setPicture,
    setName,
    setTitle,
    setDescription,
    handleAboutUsSubmit,
    handleEditChange,
    handleSaveChanges,
    handleEditToggle,
    handleCancelEdit,
    deleteAboutUsEntry,
    emails, // Get emails from the hook
    handleEmailSubmit, // Handle email submission
    emailError, // To show any errors related to email
    emailInput, // The input state for email
    setEmailInput, // To update the email input field
  };
}
