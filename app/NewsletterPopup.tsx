import { useState } from "react";
import Head from "next/head";

const NewsletterPopup = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if(!email) {
      setMessage("Please enter a valid email address.");
    } else if (isSubscribed) {
      setMessage("You are already subscribed!");
    } else {
      setIsSubscribed(true);
      setMessage("Thank you for subscribing!");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      <Head>
        <title>Newsletter Popup Page</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.headerText}>Keep up with our organization</h2>
          </div>
          <div style={styles.cardBody}>
            <p>Subscribe and receive monthly newsletters.</p>
            <div style={styles.inputContainer}>
              <button style={styles.button}>Subscribe</button>
              <input
                type="email"
                placeholder="Email Address"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p style={styles.note}>No spam, unsubscribe at anytime</p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40vh",
    backgroundColor: "white",
    backgroundSize: "cover",
    margin: 0,
  },
  card: {
    backgroundColor: "white",
    maxWidth: "1850px",
    borderRadius: "20px",
    border: "1px solid black",
    width: "100%",
    boxSizing: "border-box"
  },
  cardHeader: {
    textAlign: "center" as const,
    backgroundColor: "rgba(242, 169, 0, 1)",
    color: "black",
    padding: "30px",
    height: "45px",
    margin: 0,
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginTop: "0",
    fontSize: "23px",
    lineHeight: "1.5",
  },
  cardBody: {
    padding: "20px",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    flexDirection: "row-reverse" as const,
  },
  input: {
    padding: "10px 15px",
    outline: "none",
    border: "1px solid grey",
    fontFamily: "inherit",
  },
  button: {
    border: "none",
    outline: "none",
    backgroundColor: "rgba(242, 169, 0, 1)",
    color: "black",
    padding: "12px 20px",
    marginLeft: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    overflow: "hidden",
    boxShadow: "none",
  },
  "button:hover": {
    boxShadow: "0 0 0 5px black",
    transition: "all 0.3s ease",
  },
  note: {
    textAlign: "center" as const,
  },
};

export default NewsletterPopup;