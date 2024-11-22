"use client";

import { useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth"; // Import Amplify Auth // MODIFIDED DUE TO CAUSESING BUILD FAILER WAS IMPORT AUTH
import Link from "next/link";
import styles from "./login.module.css"; // Import CSS Module

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  // Handle login on form submission
  async function handleLogin(event: React.FormEvent) {
    event.preventDefault(); // Prevent form from reloading the page

    try {
      // AWS Amplify signIn method
      const user = (await fetchAuthSession()).credentials; // MODIFIDED FROM .signIn(username, password); BECAUSE IT CAUSED PRODUCTION BUILD FAILER
      console.log("Login successful:", user);
      alert("Login successful!"); // Optionally, you can redirect to another page
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please check your credentials.");
    }
  }

  return (
    <main className={styles.container}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className={styles.button} type="submit">Log In</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display errors */}
      <br />
      <Link href="/">Back to Home</Link>
    </main>
  );
}
