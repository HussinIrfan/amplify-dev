"use client";
import styles from "./ourwork.module.css";
import Org1 from "../ourworkAssests/circle1.jpg";
import CustomNavbar from "../customNavbar/CustomNavbar";

const orgs = [
    {
        name: "Organization 1",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: "/circle1.jpg",
    },
    {
        name: "Organization 2",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: "/rectangle2.jpg",
    },
    {
        name: "Organization 3",
        description:
            "Lorem ipsum dolor sit amet, eu pri affert facilis inciderint, deleniti urbanitas moderatius ex vim, has dolore tempor debitis ex. At quo habeo idque, adhuc tibique reprimique ius at. Ne duo case inani pertinax, errem simul necessitatibus ex qui, an cum phaedrum iracundia.",
        image: "/diamond3.jpg",
    },
];

export default function OurWorkPage() {
    return (
      <main className="main">
      <CustomNavbar/>
      <div className={styles.main}>
        <h1 className={styles.center}>Our Work</h1>
        
        {orgs.map((org, index) => (
          <div key = {index} className = {styles.center}>
            <div className = {styles.description}>
              <h2>{org.name}</h2>
              <p>{org.description}</p>
            </div>
  
            <div className={styles.imageContainer}>
              
            </div>
          </div>
        ))}
      </div>
      </main>
    );
  }