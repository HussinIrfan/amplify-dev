import { Navbar } from "@nextui-org/react";
import Link from 'next/link'; 
import styles from './CustomNavbar.module.css';
import Image from 'next/image';
import navbarIMG from '../navbarAssets/navbarBG.png';
import instaLogo from '../navbarAssets/instaLogo.png';
import fbLogo from '../navbarAssets/fbLogo.png';
import { useState } from 'react';

export default function CustomNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Dropdown Open:', !isDropdownOpen); 
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src={navbarIMG}
            alt="Navbar"
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <Navbar className={styles.navbar}>
          <div className={styles.navbarContent}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              ☰
            </button>

            <div className={`${styles.navbarLinks} ${isMobileMenuOpen ? styles.open : ''}`}>
              <Link className={styles.navbarItem} href="/" onClick={closeMobileMenu}>
                Home
              </Link>
              <Link className={styles.navbarItem} href="#" onClick={closeMobileMenu}>
                About Us
              </Link>
              <Link className={styles.navbarItem} href="#" onClick={closeMobileMenu}>
                Our Work
              </Link>
              <Link className={styles.navbarItem} href="#" onClick={closeMobileMenu}>
                News
              </Link>
              <Link className={styles.navbarItem} href="#" onClick={closeMobileMenu}>
                Calendar
              </Link>

              <div className={styles.dropdown} onClick={toggleDropdown}>
                <Link className={styles.navbarItem} href="#">Donation</Link>
                {isDropdownOpen && (
                  <div className={styles.dropdownContent}>
                    <Link className={styles.navbarItem} href="/donation" onClick={closeMobileMenu}>Donate Now</Link>
                  </div>
                )}
              </div>

              <Link className={styles.navbarItem} href="/admin" onClick={closeMobileMenu}>
                Store
              </Link>
            </div>

            <Link className={styles.instaLink} href="https://instagram.com" target="_blank" rel="noopener noreferrer">
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
