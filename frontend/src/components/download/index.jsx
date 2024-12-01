import React from "react";
import styles from "./download.module.css";
 

const Download = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img
            src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172409/foodapp-images/lmo50zjzdvp5kxr8bz9l.png"
            alt="Main Couple"
            className={styles.actualImage}
          />
          <img
            src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172407/foodapp-images/n0eb4mjk0cqxaenblr9i.png"
            alt="Shadow Couple"
            className={styles.shadowImage}
          />
        </div>
        {/* Text Section */}
        <div className={styles.textContent}>
          <h1>
          <img
            src="/assets/LOGO 1.png"
            alt="Order.uk Logo"
            className={styles.logo}
          />ing is more
          </h1>
          <h2>
            <span className={styles.highlight}>Personalised</span> & Instant
          </h2>
          <p>Download the Order.uk app for faster ordering</p>
          {/* App Store Buttons */}
          <div className={styles.buttonGroup}>
           
              <img src="/assets/app-store-badges-en 1.png" alt="App Store" />
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
