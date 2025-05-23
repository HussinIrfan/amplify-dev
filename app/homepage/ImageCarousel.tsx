import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./ImageCarousel.module.css";
import firefighters1Image from "../homepageAssets/carousel1.jpeg";
import firefighters2Image from "../homepageAssets/carousel2.jpeg";
import firefighters3Image from "../homepageAssets/carousel3.jpeg";

const images = [
  {
    src: firefighters1Image,
    title: "Support South Lake Tahoe Firefighters",
    description:
      "Your contribution helps provide vital equipment, training, and resources to keep our community safe and our firefighters ready for action.",
    buttonText: "Donate Now",
    link: "/donation", // Add link to this image's button
  },
  {
    src: firefighters2Image,
    title: "Firefighter Apparel and Gear",
    description:
      "Shop our official merchandise to support our firefighters. Proceeds fund critical programs and essential tools.",
    buttonText: "Shop Now",
    link: "/featured", // Add link to this image's button
  },
  {
    src: firefighters3Image,
    title: "Stay Connected",
    description:
      "Check out our calendar and RSVP for an event to stay connected, support our cause, and be part of the action in protecting our community.",
    buttonText: "Sign Up",
    link: "/calendar", // Add link to this image's button
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Automatically change the image every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].title}
          layout="fill"
          objectFit="cover"
          className={`${styles.carouselImage} ${images[currentIndex]}`} // Apply custom class here
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>{images[currentIndex].title}</h2>
          <p className={styles.description}>
            {images[currentIndex].description}
          </p>
          {/* Wrap the button in an anchor tag */}
          <a href={images[currentIndex].link} className={styles.actionButton}>
            {images[currentIndex].buttonText}
          </a>
        </div>
        <button onClick={handlePrev} className={styles.navButtonLeft}>
          ←
        </button>
        <button onClick={handleNext} className={styles.navButtonRight}>
          →
        </button>
      </div>
    </section>
  );
};

export default ImageCarousel;
