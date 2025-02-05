
import Head from "next/head";
import styles from "./Newsletter.module.css"; // Import the CSS file

const NewsletterPopup = () => {
  return (
    <>
      <Head>
        <title>Newsletter Popup Page</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.headerText}>Keep up with our organization</h2>
          </div>
          <div className={styles.cardBody}>
            <p>Subscribe and receive monthly newsletters.</p>
            <div className={styles.inputContainer}>
              <div className={styles.nameFields}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.input}
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={`${styles.input} ${styles.emailInput}`} // Use emailInput class here
              />
              <button className={styles.button}>Subscribe</button>
            </div>
            <p className={styles.note}>No spam, unsubscribe at any time</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;