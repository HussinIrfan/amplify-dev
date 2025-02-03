import { Navbar, Link } from "@nextui-org/react"; 
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
          layout="responsive" // Makes the image responsive
          objectFit="cover" // Maintains aspect ratio while covering the space
          className={styles.navbarImage} // Add this for styling
        />
        <div className={styles.overlayText}>South Lake Tahoe FireFighter's Foundation</div>
      </div>
      <Navbar className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link className={styles.navbarItem} href="#">
            About Us
          </Link>
          <Link className={styles.navbarItem} href="#">
            Our Work
          </Link>
          <Link className={styles.navbarItem} href="#">
            News
          </Link>
          <Link className={styles.navbarItem} href="#">
            Calendar
          </Link>

          {/* Dropdown menu for Donation */}
          <div className={styles.dropdown}>
            <Link className={styles.navbarItem} href="#">Donation</Link>
            <div className={styles.dropdownContent}>
              <Link className={styles.navbarItem} href="/donation.html">Donate Now</Link>
            </div>
          </div>

          <Link className={styles.navbarItem} href="#">
            Store
          </Link>
        </div>
      </Navbar>
    </>
  );
}
