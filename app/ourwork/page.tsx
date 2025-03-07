"use client";
import styles from "./ourwork.module.css";
import Image from "next/image";
import Org1 from "../ourworkAssests/circle1.jpg";
import Org2 from "../ourworkAssests/rectangle2.jpg";
import Org3 from "../ourworkAssests/diamond3.jpg";
import CustomNavbar from "../customNavbar/CustomNavbar";

const orgs = [
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
];

export default function OurWorkPage() 
{
  return (
      <main className="main">
      <CustomNavbar/>
      <div className={styles.main}>
        <h1 className={styles.header}>OUR WORK</h1>

        <h2 className={styles.subHeader}>
        THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS
        </h2>
        
        {orgs.map((org, index) => {
  console.log("Rendering org: ", org); // Log each item here
  return (
    <div key={index} className={styles.orgContainer}>
      <div className={styles.textContainer}>
        <h2>{org.name}</h2>
        <p>{org.description}</p>
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={org.image}
          alt={org.name}
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