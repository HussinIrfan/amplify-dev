"use client";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import styles from "./ourwork.module.css";
import {useEffect, useState} from "react";
import Image from "next/image";
//import Org1 from "../ourworkAssests/circle1.jpg";
//import Org2 from "../ourworkAssests/rectangle2.jpg";
//import Org3 from "../ourworkAssests/diamond3.jpg";
import CustomNavbar from "../customNavbar/CustomNavbar";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

/*const orgs = [
    {
        name: "ORGANIZATION 1",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: Org1,
    },
    {
        name: "ORGANIZATION 2",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: Org2,
    },
    {
        name: "ORGANIZATION 3",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: Org3,
    },
];*/

export default function OurWorkPage() 
{
  const [ourWork, setOurWork] = useState<Array<Schema["ourWork"]["type"]>>([]);
  Amplify.configure(outputs);
  const client = generateClient<Schema>();

  useEffect(() => {
    async function initialize() {
      try {
        const { data } = await client.models.ourWork.list();
        console.log("Fetched data: ", data);
        setOurWork(data);

        const newEntries = [
          {
            picture: "https://main.d2q0fy6tss8ub7.amplifyapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcircle1.1c258d33.jpg&w=828&q=75",
            business: "ORGANIZATION ONE",
            description: "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex.",
          },
          {
            picture: "https://main.d2q0fy6tss8ub7.amplifyapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frectangle2.e51ce1ad.jpg&w=828&q=75",
            business: "ORGANIZATION TWO",
            description: "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex.",
          },
          {
            picture: "https://main.d2q0fy6tss8ub7.amplifyapp.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiamond3.c0ed72a1.jpg&w=828&q=75",
            business: "ORGANIZATION THREE",
            description: "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex.",
          }
        ];

        for (const entry of newEntries){
          const entryExists = data.some(existingEntry => existingEntry.business === entry.business);
          if (!entryExists){
            await createOurWorkEntry(entry.picture, entry.business, entry.description);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    initialize();
  }, []);

  async function createOurWorkEntry(picture: string, business: string, description: string) {
    try {
      const result = await client.models.ourWork.create({
        picture,
        business,
        description,
      });
      console.log("New entry created", result);
      return result;
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  }
    
  return (
      <main className="main">
      <CustomNavbar/>
      <div className={styles.main}>
        <h1 className={styles.header}>OUR WORK</h1>

        <h2 className={styles.subHeader}>
        THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS
        </h2>
        
        {ourWork.map((org, index) => {
  console.log("Rendering org: ", org); // Log each item here
  return (
    <div key={index} className={styles.orgContainer}>
      <div className={styles.textContainer}>
        <h2>{org.business}</h2>
        <p>{org.description}</p>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={org.picture}
          alt={org.business}
          width={400}
          height={250}
          className={styles.orgImage}
          unoptimized={true}
        />
      </div>
    </div>
  );
})}
      </div>
      </main>
    );
  }