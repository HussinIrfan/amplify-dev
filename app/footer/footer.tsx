import React from "react";
import Image from "next/image";
import Link from "next/link";
import footerimg from "./footerimg.jpg";
import logo from "./logo2.png"; // Replace with your actual logo image
import styles from "./footer.module.css";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import { useState, useEffect } from "react";
import { Schema } from "@/amplify/data/resource";
import { getUrl } from 'aws-amplify/storage';


Amplify.configure(outputs);
const client = generateClient<Schema>();

const Footer = () => {
    const [url501c3, setUrl501c3] = useState("");
    const [url990, setUrl990] = useState("");

    const expirationTime = 60000 * 50; //1 minute x 50 = 50 minutes in milliseconds for cache expiration
    useEffect(()=>{
        const fetchDocUrls = async () => {
            const cachedData = localStorage.getItem('docUrls');
            const currentTimestamp = new Date().getTime();

            //console.log("Checking localStorage for cached URLs:", cachedData);

            if (cachedData) {
                const { url501c3: cachedUrl501c3, url990: cachedUrl990, timestamp } = JSON.parse(cachedData);
                
                // Check if cached data is still valid (less than 6 days old)
                if (currentTimestamp - timestamp < expirationTime) {
                    //console.log("Using cached URLs:", cachedUrl501c3, cachedUrl990);
                    setUrl501c3(cachedUrl501c3);
                    setUrl990(cachedUrl990);
                    return;
                } else {
                    //console.log("Cache expired. Fetching new URLs...");
                }
            }

            //if not in cache or expired, fetch from backend
            try {
                // Fetch entry with ID "2", this row probably contains both url's
                const response = await client.models.documents.get({id: "2"});
                //console.log("Fetched document data from backend:", response.data);

                if(response.data) {
                    const newUrls: { url501c3?: string, url990?: string } = {};

                    if(response.data.doc501c3){
                        const url1 = await getUrl({path: response.data.doc501c3, options: {expiresIn: 3600}});
                        newUrls.url501c3 = url1.url.toString();
                    }
                    if(response.data.doc990){
                        const url2 = await getUrl({ path: response.data.doc990, options: {expiresIn: 3600} });
                        newUrls.url990 = url2.url.toString();
                    }
                        // Set state with the new URLs
                        setUrl501c3(newUrls.url501c3 || "");
                        setUrl990(newUrls.url990 || "");

                     // Cache the new URLs with the current timestamp
                    const cacheData = {
                        ...newUrls,
                        timestamp: new Date().getTime(),
                    };

                    localStorage.setItem("docUrls", JSON.stringify(cacheData));
                    //console.log("Cache updated:", cacheData);
                }
            } catch(err){
                console.error("Error fetching doc URL's", err);
            }
        };
        fetchDocUrls();
    }, []);
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
                <b>2101 Lake Tahoe Blvd, South Lake Tahoe, CA</b>
                <b>support@sltfirefoundation.org</b>
            </div>

            {/* Middle Section - Download Links */}
            <div className={styles.middleContainer}>
                <h3>Documents</h3>
                {url501c3 && <a href={url501c3} target="_blank" rel="noopener noreferrer">501(c)(3) Documentation</a>}
                {url990 && <a href={url990} target="_blank" rel="noopener noreferrer">990 Form</a>}
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
