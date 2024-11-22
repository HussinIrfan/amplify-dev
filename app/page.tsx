"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import Link from "next/link";

import CustomNavbar from "./CustomNavbar";
import HPheader from "./HPheader";
import ImageCarousel from "./ImageCarousel";
import NewsletterPopup from "./NewsletterPopup";
import ContactInfoBox from "./components/ContactInfoBox";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [subs, setSubs] = useState<Array<Schema["Subscribers"]["type"]>>([]);

  function listTodos() {
    client.models.Subscribers.observeQuery().subscribe({
      next: (data) => setSubs([...data.items]),
      error: (error) => console.error("Error fetching subscribers:", error),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    const newEmail = window.prompt("Email to Add");
  
    if (newEmail) {
      // Check for duplicate email
      const existingEmails = subs
        .map((sub) => sub.email?.toLowerCase())
        .filter(Boolean);  // This removes any null or undefined email
  
      if (existingEmails.includes(newEmail.toLowerCase())) {
        alert("This email is already subscribed.");
        return;
      }
  
      // If no duplicates, proceed to create new subscriber
      client.models.Subscribers.create({
        email: newEmail,
      })
      .then((response) => {
        const newSubscriber = response.data;  // Assuming the new subscriber is in `data`
        if (newSubscriber) {
          setSubs((prevSubs) => [...prevSubs, newSubscriber]);
        }
      })
      .catch((error) => console.error("Error creating subscriber:", error));
    }
  }

  function deleteSub() {
    const emailToDelete = window.prompt("Enter the email to delete:");

    if (emailToDelete) {
      // Find the subscriber that matches the email
      const subscriberToDelete = subs.find(sub => sub.email?.toLowerCase() === emailToDelete.toLowerCase());

      if (subscriberToDelete) {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${emailToDelete}?`);
        if (confirmDelete) {
          client.models.Subscribers.delete(subscriberToDelete)
            .then(() => {
              // Remove the deleted subscriber from the local state
              setSubs((prevSubs) => prevSubs.filter((sub) => sub.id !== subscriberToDelete.id));
            })
            .catch((error) => {
              console.error("Error deleting subscriber:", error);
            });
        }
      } else {
        alert("Email not found.");
      }
    }
  }

  function updateSub() {
    const emailToUpdate = window.prompt("Enter the email to update:");
  
    if (emailToUpdate) {
      const subscriberToUpdate = subs.find(
        (sub) => sub.email?.toLowerCase() === emailToUpdate.toLowerCase()
      );
  
      if (subscriberToUpdate) {
        const newEmail = window.prompt("Enter the new email:");
        const existingEmails = subs.map((sub) => sub.email?.toLowerCase()).filter(Boolean);
  
        if (newEmail) {
          // Check for duplicate email
          if (existingEmails.includes(newEmail.toLowerCase())) {
            alert("This email is already subscribed.");
            return;
          }
  
          // Proceed to update the subscriber
          client.models.Subscribers.update({
            id: subscriberToUpdate.id,
            email: newEmail,
          })
            .then((updatedSubscriber) => {
              // Ensure only the required fields are updated in the state
              const updatedSubscriberData = {
                ...subscriberToUpdate,
                email: newEmail,
              };
  
              setSubs((prevSubs) =>
                prevSubs.map((sub) =>
                  sub.id === updatedSubscriberData.id ? updatedSubscriberData : sub
                )
              );
            })
            .catch((error) => {
              console.error("Error updating subscriber:", error);
            });
        }
      } else {
        alert("Email not found.");
      }
    }
  }
  
  return (
    <main>
      <CustomNavbar />
      <HPheader />
      <ImageCarousel />
      <NewsletterPopup />
      <ContactInfoBox />
      <h1>My Email / Subs</h1>
      <button onClick={createTodo}>+ new</button>
      <button onClick={deleteSub}> - Sub</button>
      <button onClick={updateSub}> & Update</button>
      
      <ul>
        {subs.map((sub) => (
          <li key={sub.id}>{sub.email ?? "No email provided"}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <br />
      {/* Link to the login page */}
      <Link href="/login">Go to Login Page</Link>
      
    </main>
  );
}
