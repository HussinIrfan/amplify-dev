import React from "react";
import Image from "next/image";
import boatImage from "./homepageAssets/boat_image.jpg";

const HPheader = () => {
  return (
    <section className="header-section">
      <h1 className="header-title">
        THE BETTER TRAINED THEY ARE, THE SAFER OUR COMMUNITY IS
      </h1>
      
      <div className="image-container">
        <Image
          src={boatImage}
          alt="South Lake Tahoe Firefighter's Boat"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <style jsx>{`
        .header-section {
          text-align: center;
          padding: 20px 0;
          color: #000;
          background-color: #FFFFFF;
        }

        .header-title {
          font-family: 'Jura', sans-serif;
          font-size: 30px;
          font-weight: bold;
          color: #000000;
          text-align: center;
          margin-top: 20px;
          margin-bottom: 40px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 400px;
          max-height: 70vh;
        }

        /* Adjustments for smaller screens */
        @media (max-width: 768px) {
          .header-title {
            font-size: 24px;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          .image-container {
            height: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default HPheader;
