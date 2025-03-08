"use client";

import { Navbar, Link } from "@nextui-org/react";
import styles from './CustomNavbar.module.css';
import Image from 'next/image';
import navbarIMG from '../navbarAssets/test2.png';
import navbarIMGSmall from '../navbarAssets/test2.png';
import instaLogo from '../navbarAssets/instaLogo.png';
import fbLogo from '../navbarAssets/fbLogo.png';
import { useState, useEffect } from 'react';
import useStore from "../admin/storeAdmin/StoreLogic";

export default function CustomNavbar() {
  //Admin store setting
  const {storeOpen} = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleMobileMenu = () => {
    console.log("Mobile menu toggled:", !isMobileMenuOpen); // Debugging
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

    
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1070);
    };
  
    // Initial check
    handleResize();
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={isSmallScreen ? navbarIMGSmall : navbarIMG}
            alt="Navbar"
            layout="responsive"
            objectFit="cover"
          />
        </div>
        
        <Navbar className={styles.navbar}>
          <div className={styles.navbarContent}>
            {/* Hamburger Menu Button */}
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              ☰
            </button>

            {/* Navbar Links */}
            <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
              <Link className={styles.navbarItem} href="/" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link className={styles.navbarItem} href="/aboutus" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link className={styles.navbarItem} href="/ourwork" onClick={closeMobileMenu}>
                Our Work
              </Link>
              <Link className={styles.navbarItem} href="/calendar" onClick={closeMobileMenu}>
                Calendar
              </Link>
              <Link className={styles.navbarItem} href="/donation" onClick={closeMobileMenu}>
                Donation
              </Link>

              {storeOpen && (
                <Link className={styles.navbarItem} href="/featured" onClick={closeMobileMenu}>
                Store
              </Link>
              )}              
              <Link className={styles.navbarItem} href="/contactus" onClick={closeMobileMenu}>
              Contact Us
              </Link>
            </div>

            {/* Instagram Link */}
            <Link className={styles.instaLink} href="https://instagram.com/sltfirefightersfoundation" target="_blank" rel="noopener noreferrer">
              <Image
                src={instaLogo}
                alt="Instagram"
                width={30}
                height={30}
                className={styles.instaLogo}
              />
            </Link>
            <Link className={styles.fbLink} href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image
                src={fbLogo}
                alt="Facebook"
                width={30}
                height={30}
                className={styles.fbLogo}
              />
            </Link>
          </div>
        </Navbar>
      </div>
    </>
  );
}