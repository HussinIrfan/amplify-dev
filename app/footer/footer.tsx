import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerimg from "./footerimg.jpg";
import logo from "./logo2.png"; // Replace with your actual logo image
import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.imageContainer}>
                <Image
                    src={footerimg}
                    alt="Footer Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 60%"  // Adjust which part of the image is shown
                    quality={100}
                />
            </div>

            {/* Left Section - Contact Info */}
            <div className={styles.leftContainer}>
                <h3>South Lake Tahoe Firefighter's Foundation</h3>
                <b>123 Nonprofit St, City, State, ZIP</b>
                <b>Phone: (123) 456-7890</b>
                <b>Hours: Mon-Fri 9am - 5pm</b>
                <b>Email: contact@nonprofit.org</b>
            </div>

            {/* Middle Section - Download Links */}
            <div className={styles.middleContainer}>
                <h3>Documents</h3>
                <a href="/5013c.pdf" download>501(c)(3) Documentation</a>
                <a href="/990form.pdf" download>990 Form</a>
            </div>

            {/*Social Media Section*/}
            <div className={styles.mediaContainer}>
                <h3>Social Media</h3>
                <Link href="https://instagram.com/sltfirefightersfoundation" target="_blank" rel="noopener noreferrer">Instagram</Link>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</Link>
            </div>

            {/* Right Section - Logo with Link */}
            <div className={styles.rightContainer}>
                <Link href="/admin">
                    <Image
                        src={logo}
                        alt="Nonprofit Logo"
                        width={250}
                        height={200}
                        className={styles.logo}
                    />
                </Link>
            </div>
        </div>
    );
};

export default Footer;
