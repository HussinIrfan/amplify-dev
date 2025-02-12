"use client";
import styles from "./aboutus.module.css";
import Image from "next/image";
import CustomNavbar from "../customNavbar/CustomNavbar";
import Footer from "../footer/footer";
import ContactUs from "../homepage/ContactUs";

// Import images
import AboutTheFoundation from "../aboutusAssets/aboutthefoundation.png";
import JohnSmith from "../aboutusAssets/johnsmith.png";
import JaneSmith from "../aboutusAssets/janesmith.png";
import FireFighterStaff from "../aboutusAssets/firefighterstaff.png";
import Station1 from "../aboutusAssets/station1.png";
import Station2 from "../aboutusAssets/station2.png";

const teamMembers = [
  {
    name: "John Smith",
    title: "Firefighter Captain",
    description:
      "John has been serving the South Lake Tahoe Firefighter's Foundation for over a decade, leading efforts in emergency response and community safety.",
    image: JohnSmith,
  },
  {
    name: "Jane Smith",
    title: "Community Outreach Coordinator",
    description:
      "Jane is dedicated to organizing outreach programs, ensuring the foundation remains connected to the community through education and engagement.",
    image: JaneSmith,
  },
];

export default function AboutUsPage() {
  return (
    <main>
      <CustomNavbar />
      <div className={styles.main}>
        {/* About The Foundation Section */}
        <h1 className={styles.header}>About the Foundation</h1>
        <div className={styles.section}>
          <Image
            src={AboutTheFoundation}
            alt="About the Foundation"
            className={styles.foundationImage}
            width={600}
            height={400}
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

        {/* Foundation Team Section */}
        <h1 className={styles.header}>The Foundation Team</h1>
        <div className={styles.teamContainer}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamMember}>
              <Image
                src={member.image}
                alt={member.name}
                className={styles.teamImage}
                width={200}
                height={200}
              />
              <h2 className={styles.memberName}>{member.name}</h2>
              <p className={styles.memberTitle}>{member.title}</p>
              <p className={styles.memberDescription}>{member.description}</p>
            </div>
          ))}
        </div>

        {/* Firefighter Staff Section */}
        <h1 className={styles.header}>Firefighter Staff</h1>
        <div className={styles.section}>
          <Image
            src={FireFighterStaff}
            alt="Firefighter Staff"
            className={styles.staffImage}
            width={600}
            height={400}
          />
        </div>

        {/* Firefighter Stations Section */}
        <h1 className={styles.header}>Station 1</h1>
        <div className={styles.stationContainer}>
          <Image
            src={Station1}
            alt="Station 1"
            className={styles.stationImage}
            width={600}
            height={400}
          />
          <p className={styles.stationText}>
            Station 1 serves as a critical hub for emergency response, housing
            advanced equipment and a team of dedicated firefighters ready to
            serve the South Lake Tahoe community.
          </p>
        </div>

        <h1 className={styles.header}>Station 2</h1>
        <div className={styles.stationContainer}>
          <Image
            src={Station2}
            alt="Station 2"
            className={styles.stationImage}
            width={600}
            height={400}
          />
          <p className={styles.stationText}>
            Station 2 plays a vital role in fire prevention and safety
            education, ensuring rapid response times and protection for our
            community members.
          </p>
        </div>

        {/* Contact Us Section Copied from Homepage */}
        <ContactUs />
      </div>
      <Footer />
    </main>
  );
}