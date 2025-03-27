"use client";
import styles from "./ourwork.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { useEffect, useState } from "react";
import {useOurWorkLogic} from "@/app/admin/ourWork/OurWorkLogic";

export default function OurWorkPage() 
{
  const { ourWorks } = useOurWorkLogic(); // fetch organizations
  const [cachedWorks, setCachedWorks] = useState<typeof ourWorks>([]);

  const checkForUpdates = () => 
  {
    const updateData = sessionStorage.getItem("ourWorks");

    if (updateData)
    {
      setCachedWorks(JSON.parse(updateData));
    }
    else
    {
      setCachedWorks(ourWorks);
    }
  }

  useEffect(() => 
  {
    const cachedData = sessionStorage.getItem("ourWorks");
    if(cachedData)
    {
      setCachedWorks(JSON.parse(cachedData));
    }
    else
    {
      setCachedWorks(ourWorks);
      sessionStorage.setItem("ourWorks", JSON.stringify(ourWorks));
    }
    console.log("Organization data: ", ourWorks)
    console.log("cachedworks:", cachedWorks)

    const interval = setInterval(checkForUpdates, 10000);
    return () => clearInterval(interval);
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