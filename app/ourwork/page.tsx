"use client";

import styles from "./ourwork.module.css";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/storageUtils";
import { useOurWorkLogic } from "@/app/admin/ourWork/OurWorkLogic";

export default function OurWorkPage() {
  const { ourWorks } = useOurWorkLogic();
  const [cachedOurWorks, setCachedOurWorks] = useState<typeof ourWorks>([]);

  useEffect(() => {
    const cached = getItem<typeof ourWorks>('ourWorks');
  
    if (ourWorks.length > 0) {
      // ✅ Update cache and state when new data is available
      setItem('ourWorks', ourWorks);
      setCachedOurWorks(ourWorks);
    } else if (cached && cached.length > 0) {
      // ✅ Use cached data only if backend is empty
      setCachedOurWorks(cached);
    } else {
      // ❌ No data anywhere? Clear state + cache
      setCachedOurWorks([]);
      localStorage.removeItem('ourWorks');
    }
  }, [ourWorks]);

  const displayData = cachedOurWorks.length > 0 ? cachedOurWorks : ourWorks;

  return (
    <main>
      <CustomNavbar />
      <div className={styles.main}>
        <h1 className={styles.header}>Our Work</h1>
        <p className={styles.subHeader}>
          The Primary Mission of the South Lake Tahoe Firefighter’s Foundation is to bolster firefighter health, safety, and wellness within our community. We’re dedicated to equipping our local heroes with the tools, training, and resources they need to respond to emergencies effectively while prioritizing their own well-being.<br /><br />
          In line with our core purpose, we also make donations to public entities that align with our mission, strengthening the broader firefighting network and its capabilities. We contribute to charities aimed at fostering a positive community relationship. We recognize the importance of a strong bond between our firefighters and the community they serve, and we strive to enhance this connection through outreach, education, and philanthropy.
        </p>

        {displayData.length > 0 && (
          <>
            <div className={styles.sectionDivider}></div>
            <h1 className={styles.header}>Partnering Organizations</h1>
            <div className={styles.organizationGrid}>
              {displayData.map((org) => (
                <div key={org.id} className={styles.organizationCard}>
                  <h2 className={styles.businessName}>{org.business}</h2>
                  <p className={styles.businessDescription}>{org.description}</p>
                  {org.picture ? (
                    <StorageImage
                      path={org.picture}
                      alt="Organization"
                      className={styles.organizationImage}
                      fallbackSrc="/ourWork/Document.jpg"
                      data-testid={`org-image-${org.id}`}
                    />
                  ) : null}
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
