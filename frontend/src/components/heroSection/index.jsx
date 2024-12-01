import React from "react";
import styles from "./herosection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <p>Order restaurant food, takeaway, and groceries.</p>
        <h1>
          Feast Your Senses,<span>Fast and Fresh</span>
        </h1>
        <p>Enter a postcode to see what we deliver</p>
        <div className={styles.withbtn}>
          <input
            className={styles.codeInput}
            type="text"
            placeholder="e.g. EC4R 3TE"
          />
          <button className={styles.searchBtn}>Search</button>
        </div>
      </div>

      {/* Middle Image */}
      <img
        src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172427/foodapp-images/ds89r94tslnkpux7zxkk.png"
        alt="Main Visual"
        className={styles.middleImage}
      />

      {/* Right Section */}
      <div className={styles.rightSection}>
        <img
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172429/foodapp-images/iaqk9yqg1iyy2rlm47yk.png"
          alt="Overlay"
          className={styles.rightOverlayImage}
        />
        <div className={styles.reviewCard}>
          <div className={styles.cardNumber}>1</div>
          <img
            src="/assets/LOGO 1.png"
            alt="Logo"
            className={styles.smallLogo}
          />
          <h3>We’ve Received your order!</h3>
          <p>Awaiting Restaurant acceptance</p>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.cardNumber}>2</div>
          <img
            src="/assets/LOGO 1.png"
            alt="Logo"
            className={styles.smallLogo}
          />
          <h3>Order Accepted!</h3>
          <p>Your order will be delivered shortly</p>
        </div>

        <div className={styles.reviewCard}>
          <div className={styles.cardNumber}>3</div>
          <img
            src="/assets/LOGO 1.png"
            alt="Logo"
            className={styles.smallLogo}
          />
          <h3>Your rider is nearby..!</h3>
          <p>Your rider's nearby!</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
