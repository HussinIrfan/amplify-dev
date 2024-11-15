// app/components/CustomNavbar.tsx
import React from 'react';
import { Navbar, Link } from "@nextui-org/react"; // Ensure you have installed this library
import styles from './page.module.css'; // Import your CSS module
import Image from 'next/image'; // Import Image from next/image
import navbarImage from './navbarAssets/navbar_image.jpg'; // Adjust the path according to your folder structure

export default function CustomNavbar() {
  return (
    <>
      <div className={styles.imageContainer}>
      <Image
        src={navbarImage}
        alt="Navbar"
        fill
        style={{ objectFit: 'cover' }}
        className={styles.navbarImage}
    />

        <div className={styles.overlayText}>South Lake Tahoe FireFighter's Foundation</div>
      </div>
      <Navbar className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link className={styles.navbarItem} href="/about">
            About Us
          </Link>
          <Link className={styles.navbarItem} href="/work">
            Our Work
          </Link>
          <Link className={styles.navbarItem} href="/news">
            News
          </Link>
          <Link className={styles.navbarItem} href="/calendar">
            Calendar
          </Link>
          <Link className={styles.navbarItem} href="/donation">
            Donation
          </Link>
          <Link className={styles.navbarItem} href="/store">
            Store
          </Link>
        </div>
      </Navbar>
    </>
  );
}
