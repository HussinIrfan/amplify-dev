import React, { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import navbarImage from './navbarAssets/navbar_image.jpg';

export default function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header>
      {/* Background image and overlay text */}
      <div className={styles.imageContainer}>
        <Image 
          src={navbarImage} 
          alt="South Lake Tahoe FireFighter's Foundation" 
          layout="fill" 
          objectFit="cover" 
          className={styles.navbarImage} 
          priority 
        />
        <div className={styles.overlayText}>South Lake Tahoe FireFighter's Foundation</div>

        {/* Hamburger Icon - Positioned on top right of image */}
        {!isMenuOpen && (
          <div className={styles.hamburger} onClick={toggleMenu}>
            ☰
          </div>
        )}
      </div>
      
      {/* Full-Screen Overlay Menu */}
      {isMenuOpen && (
        <div className={styles.fullScreenMenu}>
          <div className={styles.hamburger} onClick={toggleMenu}>✖</div> {/* Close Icon */}
          <ul className={styles.navLinks}>
            <li className={styles.navItem}><a href="#">About Us</a></li>
            <li className={styles.navItem}><a href="#">Our Work</a></li>
            <li className={styles.navItem}><a href="#">News</a></li>
            <li className={styles.navItem}><a href="#">Calendar</a></li>
            <li className={styles.navItem}><a href="#">Donation</a></li>
            <li className={styles.navItem}><a href="#">Store</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
