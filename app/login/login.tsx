"use client";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsconfig from "../../src/aws-exports.js"; // Adjust path if needed
import styles from "./page.module.css"; // Import styles
import { useEffect } from "react";

// Configure Amplify with AWS config
Amplify.configure(awsconfig);

export default function LoginPage() {
  
  useEffect(() => {
    // Clear the localStorage on initial load (optional)
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');  // Clear any previous user data
  }, []);

  return (
    <div className={styles.authContainer}>
      {/* The Authenticator component should be responsible for providing the context */}
      <Authenticator loginMechanisms={['username']} hideSignUp>
        {({ signOut, user }) => {
          if (user) {
            // Store user data in localStorage when the user is authenticated
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(user));
          }
          
          return (
            <div>
              <h1>Welcome, {user?.username}</h1>
              
              {/* Go to /admin in a new tab when authenticated */}
              <button
                onClick={() => {
                  window.open("/admin", "_blank");
                  console.log(user);
                }}
                className={styles.goToAdminButton}
              >
                Go to Admin
              </button>

              {/* Sign out button */}
              <button onClick={signOut} className={styles.signOutButton}>
                Sign Out
              </button>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}
