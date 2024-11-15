// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css"; // Optional CSS module for styling

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    // Placeholder for login logic
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Login attempt submitted!");
  }

  return (
    <main className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <br />
      <Link href="/">Back to Home</Link>
    </main>
  );
}

