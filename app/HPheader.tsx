import React from "react";
import Image from "next/image";
import boatImage from "./homepageAssets/boat_image.jpg";

const HPheader = () => {
  return (
    <section style={{ textAlign: "center", padding: "20px 0", color: "#000", backgroundColor: "#FFFFF" }}>
      <h1 className="hp-header">
        THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS
      </h1>
      <div style={{
        position: "relative",
        width: "100%",
        height: "400px", // Adjust height as needed
        //marginBottom: "20px"
      }}>
        <Image
          src={boatImage}
          alt="South Lake Tahoe Firefighter's Boat"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </section>
  );
};

export default HPheader;
