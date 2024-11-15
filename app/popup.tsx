import React from "react";


const NewsletterPopup: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2>Keep up with our organization</h2>
        </div>
        <div style={styles.cardBody}>
          <p>Subscribe and receive monthly newsletters.</p>
          <div style={styles.inputContainer}>
            <button style={styles.button}>Subscribe</button>
            <input
              type="email"
              placeholder="Email Address"
              style={styles.input}
            />
          </div>
          <p style={styles.note}>No spam, unsubscribe at anytime</p>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "white",
    backgroundSize: "cover",
    margin: 0,
  },
  card: {
    backgroundColor: "white",
    maxWidth: "400px",
    borderRadius: "20px",
    border: "1px solid black",
  },
  cardHeader: {
    textAlign: "center" as const,
    backgroundColor: "rgba(252, 229, 25, 0.89)",
    color: "black",
    padding: "30px",
    height: "50px",
    margin: 0,
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  cardBody: {
    padding: "30px",
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
    backgroundColor: "rgba(252, 229, 25, 0.89)",
    color: "black",
    padding: "12px 20px",
    marginLeft: "10px",
    borderRadius: "5px",
  },
  note: {
    textAlign: "center" as const,
  },
};


export default NewsletterPopup;