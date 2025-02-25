
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
          <form action="http://sendy.sltfirefoundation.org/subscribe" method="POST" acceptCharset="utf-8">
          <div className={styles.cardBody}>
            <p>Subscribe and receive monthly newsletters.</p>
            <div className={styles.inputContainer}>
              <input
                type="email"
                name ="email" //Sendy required field
                placeholder="Email Address"
                className={`${styles.input} ${styles.emailInput}`} // Use emailInput class here
                required 
              />

              {/* Hidden fields required by Sendy */}
              <input type="hidden" name="list" value="JqlRJUDG7v4763iVTyZT8TaQ" />
              <input type="hidden" name="subform" value="yes" />
              <button className={styles.button}>Subscribe</button>
            </div>
            <p className={styles.note}>No spam, unsubscribe at any time</p>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;