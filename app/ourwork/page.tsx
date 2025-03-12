"use client";
import styles from "./ourwork.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { useEffect } from "react";
import {useOurWorkLogic} from "@/app/admin/ourWork/OurWorkLogic";

export default function OurWorkPage() 
{
const { ourWorks } = useOurWorkLogic(); // fetch organizations

useEffect(() => {
  console.log("Organization data: ", ourWorks)
}, [ourWorks]);
  
  return (
      <main className="main">
      <CustomNavbar/>

      <div className={styles.main}>
        {/*Header*/}
        <h1 className={styles.header}>OUR WORK</h1>
        <h2 className={styles.subHeader}>
        THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS
        </h2>
       
       {/* Organizations */}
        <div className={styles.orgContainer}>
        {ourWorks.length > 0 ? (
            ourWorks.map((org) => (
              <div key={org.id}>
                <h3>{org.business || "No Business Name"}</h3>
                <p className={styles.textContainer}>{org.description || "No description available."}</p>
                <StorageImage
                  path={org.picture || ""}
                  alt={org.picture ? `${org.picture} Image` : "No Image"}
                  className={styles.imageContainer}
                  fallbackSrc="/ourWork/Document.jpg" 
                />
              </div>
            ))
          ) : (
            <p>Loading organizations...</p> 
          )}
        </div>
      </div>
      </main>
    );
  }