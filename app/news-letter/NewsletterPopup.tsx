import { useState } from "react";
import Head from "next/head";
import "./news-letter.css";
import { useEmailListLogic } from "../admin/EmailListLogic";

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
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h2 className="header-text">Keep up with our organization</h2>
          </div>
          <div className="card-body">
            <p>Subscribe and receive monthly newsletters.</p>
            <div className="input-container">
              <button className="button">Subscribe</button>
              <input
                className="input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="">No spam, unsubscribe at anytime</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterPopup;