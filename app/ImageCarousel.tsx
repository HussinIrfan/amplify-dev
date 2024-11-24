import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageCarousel.module.css";
import firefighters1Image from "./homepageAssets/firefighters1.jpg";
import firefighters2Image from "./homepageAssets/firefighters2.jpeg";
import firefighters3Image from "./homepageAssets/firefighters3.jpg";

const images = [
  {
    src: firefighters1Image,
    className: styles.imageOne, // Unique class for positioning
    title: "Support South Lake Tahoe Firefighters",
    description:
      "Your contribution helps provide vital equipment, training, and resources to keep our community safe and our firefighters ready for action.",
    buttonText: "Donate Now",
  },
  {
    src: firefighters2Image,
    className: styles.imageTwo, // Unique class for positioning
    title: "Firefighter Apparel and Gear",
    description:
      "Shop our official merchandise to support our firefighters. Proceeds fund critical programs and essential tools.",
    buttonText: "Shop Now",
  },
  {
    src: firefighters3Image,
    className: styles.imageThree, // Unique class for positioning
    title: "Stay Connected",
    description:
      "Join our newsletter to receive updates on firefighter stories, upcoming events, and how you can help protect our community.",
    buttonText: "Sign Up",
  },
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize a ref to store the interval ID
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Function to start the interval for automatic image change
  const startAutoTransition = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear any existing interval
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // 6000ms = 6 seconds
  };

  // Start the interval when the component mounts
  useEffect(() => {
    startAutoTransition();

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset the timer on manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    startAutoTransition(); // Reset the interval
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    startAutoTransition(); // Reset the interval
  };

  return (
    <section className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].title}
          layout="fill"
          objectFit="cover"
          className={`${styles.carouselImage} ${images[currentIndex].className}`} // Apply custom class here
        />
        <div className={styles.overlay}>
          <h2 className={styles.title}>{images[currentIndex].title}</h2>
          <p className={styles.description}>
            {images[currentIndex].description}
          </p>
          <button className={styles.actionButton}>
            {images[currentIndex].buttonText}
          </button>
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