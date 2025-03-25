"use client";

import styles from "./aboutus.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import ContactUs from "../homepage/ContactUs";
import { useAboutUsLogic } from "@/app/admin/aboutUs/AboutUsLogic";
import { useFireStationsLogic } from "@/app/admin/aboutUs/FireStationLogic";
import { useHonorsLogic } from "@/app/admin/aboutUs/HonorsLogic";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect } from "react";

// Import static images
import AboutTheFoundation from "../aboutusAssets/aboutthefoundation.png";

export default function AboutUsPage() {
  const { emps } = useAboutUsLogic(); // Fetch team members
  const { stations } = useFireStationsLogic(); // Fetch fire stations
  const { honors } = useHonorsLogic(); // Fetch honors data

  useEffect(() => {
    console.log("✅ Team Members Data:", emps);
    console.log("🚒 Fire Stations Data:", stations);
    console.log("🏆 Honors Data:", honors);
  }, [emps, stations, honors]);

  return (
    <main>
      <CustomNavbar />
      <div className={styles.main}>
        {/* ✅ About The Foundation Section */}
        <h1 className={styles.header}>About the Foundation</h1>
        <div className={styles.section}>
          <img
            src={AboutTheFoundation.src}
            alt="Blank"
            className={styles.foundationImage}
          />
          <p className={styles.foundationText}>
            The South Lake Tahoe Firefighter’s Foundation equips firefighters
            with tools, training, and resources needed to respond to emergencies
            while prioritizing their well-being. In line with our core purpose,
            we also make donations to public entities that align with our
            mission, strengthening the broader firefighting network and its
            capabilities.
          </p>
        </div>

        {/* ✅ Yellow divider between sections */}
        <div className={styles.sectionDivider}></div>

        {/* ✅ Foundation Team Section - Dynamic */}
        {emps && emps.length > 0 && (
          <>
          <h1 className={styles.header}>The Foundation Team</h1>
          <div className={styles.teamGrid}>
            {emps.map((member) => (
              <div key={member.id} className={styles.teamMember}>
                <StorageImage
                path={member.picture || ""}
                alt="No Image"
                className={styles.teamImage}
                fallbackSrc="/default-placeholder.jpg"
                />
                 <h2 className={styles.memberName}>{member.name}</h2>
                 <p className={styles.memberTitle}>{member.title}</p>
                 <p className={styles.memberDescription}>{member.description}</p>
                 </div>
                ))}
                </div>
                <div className={styles.sectionDivider}></div> {/* Yellow divider */}
                </>
              )}

        {/* ✅ Fire Stations Section - Dynamic */}
        {stations && stations.length > 0 && (
          <>
          <h1 className={styles.header}>Firefighter Stations</h1>
          <div className={styles.stationGrid}>
            {stations.map((station) => (
              <div key={station.id} className={styles.stationCard}>
                <StorageImage
                path={station.image || ""}
                alt="Blank"
                className={styles.stationImage}
                fallbackSrc="/default-placeholder.jpg"
                />
                <h2 className={styles.stationName}>{station.stationName}</h2>
                <p className={styles.stationAddress}>{station.address}</p>
                <p className={styles.stationPhone}>{station.phone}</p>
                </div>
              ))}
              </div>
              <div className={styles.sectionDivider}></div> {/* Yellow divider */}
              </>
            )}

        {/* ✅ Honors & Awards Section - Dynamic */}
        {honors && honors.length > 0 && (
          <>
          <h1 className={styles.header}>Honors & Awards</h1>
          <div className={styles.honorsGrid}>
            {honors.map((honor) => (
              <div key={honor.id} className={styles.honorCard}>
                <StorageImage
                path={honor.recipientImage || ""}
                alt="No Image"
                className={styles.honorImage}
                fallbackSrc="/default-placeholder.jpg"
                />
                <h2 className={styles.honorTitle}>{honor.recipientName}</h2>
                <p className={styles.honorRecipient}>
                  Recipient: <strong>{honor.title}</strong>
                  </p>
                  <p className={styles.honorDate}>Awarded on: {honor.dateAwarded}</p>
                  <p className={styles.honorDescription}>{honor.description}</p>
                  </div>
                ))}
                </div>
                <div className={styles.sectionDivider}></div> {/* Yellow divider */}
                </>
              )}
    
      </div>
      <Footer />
    </main>
  );
}
