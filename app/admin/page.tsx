"use client";

import { Amplify } from "aws-amplify";
import { useState, useEffect } from "react";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "../page.module.css"
import CustomNavbar from "../CustomNavbar";
import "./admin.css";
import blankImage from"../global-images/blank-person.png";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

const client = generateClient<Schema>();
export default function AdminPage() {

  // variables
  const [emps, setEmp] = useState<Array<Schema["aboutUs"]["type"]>>([]);

  //about us variables
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function listAboutUs(){
    client.models.aboutUs.observeQuery().subscribe({
      next: (data) => setEmp([...data.items]),
      error: (err) => console.log(err),
    })
  }

  useEffect(() => {
    listAboutUs();
  }, []);

  async function createAboutUsEntry(picture: string, name: string, description: string) {
    try {
      const result = await client.models.aboutUs.create({
        picture,
        name,
        description,
      });
      console.log("New entry created:", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }

  function handleAboutUsSubmit(event: React.FormEvent) {
    event.preventDefault(); // Prevent the page from refreshing
    createAboutUsEntry(picture, name, description);
    // Optionally reset the fields
    setPicture("");
    setName("");
    setDescription("");
  }

  
  return (
    <main className="main">
      <CustomNavbar />
      <div>
        <h1 className="admin-h1"> Admin Settings</h1>
      </div>
      <div>
        <h2 className="admin-h2"> About Us </h2>
        <p>Take out this p tag and create 4 buttons with the CRUD implematation</p>        
        <form onSubmit={handleAboutUsSubmit}>
        <div>
          <label>
            Picture URL:
            <input
              type="text"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              placeholder="Enter picture URL"
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </label>
        </div>
        <button type="submit">Create Entry</button>
      </form>
        <ul>
        {emps.map((emp) => (
          <li key={emp.aboutID}>
            <h2>Picture URL:</h2>
            <img src="../../global-images/blank-person.png"/>
            <h2>Name:</h2>
            <h3>{emp.name}</h3>
            <h2>Description:</h2>
            <p>{emp.description}</p>
          </li>
        ))}
      </ul>
      </div>
      <div>
      <h2 className="admin-h2"> Our Work </h2>
      </div>      
      <div>
      <h2 className="admin-h2"> News</h2>
      </div>
      <div>
      <h2 className="admin-h2"> Calendar </h2>
      </div>
      <div>
      <h2 className="admin-h2"> Donation </h2>
      </div>
      <div>
      <h2 className="admin-h2"> Store </h2>
      </div>
    </main>
  );
}
