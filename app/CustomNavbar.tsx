import { Navbar, Link } from "@nextui-org/react"; // Ensure you have this library installed
import styles from './page.module.css'; // Import your CSS module
import Image from 'next/image'; // Import Image from next/image
import navbarImage from './navbarAssets/navbar_image.jpg'; // Adjust the path according to your folder structure
import logoImage from './navbarAssets/Logo-CutOut.png';
import instaLogo from './navbarAssets/instaLogo.png';
export default function CustomNavbar() {

  const instagramAccount = "https://www.instagram.com/sltfirefightersfoundation/";

  return (
    <>
    <div className = {styles.container}>
      <div className={styles.imageContainer}>
        
        <Image 
          src={navbarImage} 
          alt="Navbar" 
          layout="responsive" // Makes the image responsive
          objectFit="cover" // Maintains aspect ratio while covering the space
          className={styles.navbarImage} // Add this for styling
        />
      <div className={styles.textContainer}>
        <Link href ="/" className={styles.logoLink}>
            <Image
              src ={logoImage}
              alt = "Logo"
              width={180}
              height={160}
            
            
            />
        </Link>

        <div className={styles.overlayText}>South Lake Tahoe FireFighter's Foundation</div> {/* Add overlay text here */}
      </div>
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

          <Link className={styles.instaLink} href = {instagramAccount} target="_blank" rel="noopener noreferrer">
          
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
