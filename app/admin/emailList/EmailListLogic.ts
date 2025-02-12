import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export function useEmailListLogic() {
  const [emails, setEmail] = useState<Array<Schema["Subscribers"]["type"]>>([]);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [emailSearchQuery, setEmailSearchQuery] = useState<string>("");

  // Function to list existing "Email List" entries from Subscribers table with filtering based on emailSearchQuery
  function listEmails() {
    const query = emailSearchQuery
      ? { filter: { email: { eq: emailSearchQuery } } }
      : {};

    client.models.Subscribers.observeQuery(query).subscribe({
      next: (data) => setEmail([...data.items]),
      error: (err) => console.log(err),
    });
  }

  // UseEffect to fetch initial data
  useEffect(() => {
    listEmails(); // Fetch emails from the Subscribers table
  }, []);

  // Handle email search functionality
  const handleSearchEmails = () => {
    listEmails(); // Trigger the listEmails function to apply search
    setEmailSearchQuery("");
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Convert email input to lowercase
    const emailInputLower = emailInput.toLowerCase();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInputLower)) {
      setEmailError("Invalid email format.");
      return;
    }

    // Check if email already exists (in lowercase)
    const existingEmails = emails.filter(
      (email) => email.email === emailInputLower
    );
    if (existingEmails.length > 0) {
      setEmailInput("");
      setEmailError("Email already subscribed.");
      return;
    }

    try {
      // Create new subscriber entry with lowercase email
      const newSubscriber = await client.models.Subscribers.create({
        email: emailInputLower,
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

  // Function to handle email selection for bulk delete
  const handleEmailCheckboxChange = (emailId: string) => {
    setSelectedEmails((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(emailId)) {
        newSelected.delete(emailId); // Deselect email if it's already selected
      } else {
        newSelected.add(emailId); // Select email
      }
      return newSelected;
    });
  };

  // Function to handle the bulk deletion of selected emails
  const handleBulkDeleteEmails = async () => {
    if (selectedEmails.size === 0) {
      alert("No emails selected for deletion.");
      return;
    }

    if (
      window.confirm("Are you sure you want to delete the selected emails?")
    ) {
      try {
        const emailsToDelete = emails.filter((email) =>
          selectedEmails.has(email.id)
        );

        for (const email of emailsToDelete) {
          await client.models.Subscribers.delete({ id: email.id });
          console.log(`Email with ID ${email.id} deleted successfully.`);
        }

        // Refresh the email list
        listEmails();
        setSelectedEmails(new Set()); // Clear selected emails after deletion
      } catch (error) {
        console.error("Error deleting emails:", error);
      }
    }
  };

  // Function to delete an individual email
  const handleDeleteEmail = async (emailId: string) => {
    if (window.confirm("Are you sure you want to delete this email?")) {
      try {
        const result = await client.models.Subscribers.delete({ id: emailId });

        if (result) {
          console.log(`Email with ID ${emailId} deleted successfully.`);
          setEmail((prevEmails) =>
            prevEmails.filter((email) => email.id !== emailId)
          );
        }
      } catch (error) {
        console.error("Error deleting email:", error);
      }
    }
  };

  return {
    emails,
    emailError,
    emailInput,
    setEmailInput,
    selectedEmails,
    emailSearchQuery,
    setEmailSearchQuery,
    handleSearchEmails,
    handleEmailSubmit,
    handleEmailCheckboxChange,
    handleBulkDeleteEmails,
    handleDeleteEmail,
  };
}
