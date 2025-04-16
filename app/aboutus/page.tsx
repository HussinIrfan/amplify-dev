"use client";

import styles from "./aboutus.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import { useAboutUsLogic } from "@/app/admin/aboutUs/AboutUsLogic";
import { useFireStationsLogic } from "@/app/admin/aboutUs/FireStationLogic";
import { useHonorsLogic } from "@/app/admin/aboutUs/HonorsLogic";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/storageUtils";

// Static image
import AboutTheFoundation from "../aboutusAssets/aboutthefoundation.jpg";

export default function AboutUsPage() {
  const { emps } = useAboutUsLogic();
  const { stations } = useFireStationsLogic();
  const { honors } = useHonorsLogic();

  // Cache-aware state (fallbacks to cached data)
  const [cachedEmps, setCachedEmps] = useState<typeof emps>([]);
  const [cachedStations, setCachedStations] = useState<typeof stations>([]);
  const [cachedHonors, setCachedHonors] = useState<typeof honors>([]);  

  // Update localStorage only when new data is available
  useEffect(() => {

    if (typeof window !== "undefined") {
      const localEmps = getItem<typeof emps>("emps");
      const localStations = getItem<typeof stations>("stations");
      const localHonors = getItem<typeof honors>("honors");
  
      if (localEmps) setCachedEmps(localEmps);
      if (localStations) setCachedStations(localStations);
      if (localHonors) setCachedHonors(localHonors);
    }
    
    const hasEmps = emps.length > 0;
    const hasStations = stations.length > 0;
    const hasHonors = honors.length > 0;

  // ✅ Update or clear employees
  if (hasEmps) {
    setCachedEmps(emps);
    setItem("emps", emps);
  } else {
    setCachedEmps([]);
    localStorage.removeItem("emps");
  }

  // ✅ Update or clear stations
  if (hasStations) {
    setCachedStations(stations);
    setItem("stations", stations);
  } else {
    setCachedStations([]);
    localStorage.removeItem("stations");
  }

  // ✅ Update or clear honors
  if (hasHonors) {
    setCachedHonors(honors);
    setItem("honors", honors);
  } else {
    setCachedHonors([]);
    localStorage.removeItem("honors");
  }
}, [emps, stations, honors]);

  return (
    <main>
      <CustomNavbar />
      <div className={styles.main}>
        {/* ✅ About the Foundation */}
        <h1 className={styles.header}>About the Foundation</h1>
        <div className={styles.section}>
          <img
            src={AboutTheFoundation.src}
            alt="About The Foundation"
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
        {/* Yellow Bars */}
        <div className={styles.sectionDivider}></div>

        {/* ✅ Team Members */}
        {cachedEmps.length > 0 && (
          <>
            <h1 className={styles.header}>The Foundation Team</h1>
            <div className={styles.teamGrid}>
              {cachedEmps.map((member) => (
                <div key={member.id} className={styles.teamMember}>
                  {member.picture ? (
                    <StorageImage
                      path={member.picture}
                      alt="Team Member Image"
                      className={styles.teamImage}
                      fallbackSrc="/default-placeholder.jpg"
                   />
                  ) : (
                    <img
                      src="/default-placeholder.jpg"
                      alt="Team Member Image"
                      className={styles.teamImage}
                    />
                  )}
                  <h2 className={styles.memberName}>{member.name}</h2>
                  <p className={styles.memberTitle}>{member.title}</p>
                  <p className={styles.memberDescription}>{member.description}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionDivider}></div>
          </>
        )}

        {/* ✅ Fire Stations */}
        {cachedStations.length > 0 && (
          <>
            <h1 className={styles.header}>Firefighter Stations</h1>
            <div className={styles.stationGrid}>
              {cachedStations.map((station) => (
                <div key={station.id} className={styles.stationCard}>
                  <StorageImage
                    path={station.image || ""}
                    alt="Fire Station"
                    className={styles.stationImage}
                    fallbackSrc="/default-placeholder.jpg"
                  />
                  <h2 className={styles.stationName}>{station.stationName}</h2>
                  <p className={styles.stationAddress}>{station.address}</p>
                  <p className={styles.stationPhone}>{station.phone}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionDivider}></div>
          </>
        )}

        {/* ✅ Honors */}
        {cachedHonors.length > 0 && (
          <>
            <h1 className={styles.header}>Honors & Awards</h1>
            <div className={styles.honorsGrid}>
              {cachedHonors.map((honor) => (
                <div key={honor.id} className={styles.honorCard}>
                  <StorageImage
                    path={honor.recipientImage || ""}
                    alt="Award Recipient"
                    className={styles.honorImage}
                    fallbackSrc="/default-placeholder.jpg"
                  />
                  <h2 className={styles.honorTitle}>{honor.recipientName}</h2>
                  <p className={styles.honorRecipient}><strong>{honor.title}</strong></p>
                  <p className={styles.honorDate}>Awarded on: {honor.dateAwarded}</p>
                  <p className={styles.honorDescription}>{honor.description}</p>
                </div>
              ))}
            </div>
            <div className={styles.sectionDivider}></div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}
