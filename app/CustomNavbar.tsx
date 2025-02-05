import { Navbar, Link } from "@nextui-org/react";
import styles from './CustomNavbar.module.css';
import Image from 'next/image';
import navbarIMG from './navbarAssets/navbarBG.png';
import instaLogo from './navbarAssets/instaLogo.png';
export default function CustomNavbar() {
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
          <Link className={styles.navbarItem} href="#">
            Donation
          </Link>
          <Link className={styles.navbarItem} href="/admin">
            Store
          </Link>

          <Link className={styles.instaLink} href = "https://instagram.com" target="_blank" rel="noopener noreferrer">
          
            <Image 
              src={instaLogo} 
              alt="Instagram" 
              width={30} 
              height={30}
              className={styles.instaLogo} // Add styling class for further customization
            />
          
          </Link>
        </div>
      </Navbar>
      </div>
    </>
  );
}
