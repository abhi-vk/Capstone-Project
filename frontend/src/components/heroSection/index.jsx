import React from "react";
import styles from "./herosection.module.css";

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h1 className={styles.heading}>
          Feast Your Senses,{" "}
          <span className={styles.highlight}>Fast and Fresh</span>
        </h1>
        <p className={styles.subText}>
          Order Restaurant food, takeaway and groceries.
        </p>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="e.g. EC4R 3TE"
            className={styles.input}
          />
          <button className={styles.searchButton}>Search</button>
        </div>
        
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <div className={styles.orderStep}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <p className={styles.orderTitle}>
              <img
                src="/assets/LOGO 1.png"
                alt="Order.uk Logo"
                className={styles.ordering}
              />
              ing
            </p>
            <p className={styles.orderText}>
              We've Received Your order! Awaiting Restaurant acceptance.
            </p>
            <span className={styles.timestamp}>now</span>
          </div>
        </div>
        <div className={styles.orderStep}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <p className={styles.orderTitle}>
            <img
                src="/assets/LOGO 1.png"
                alt="Order.uk Logo"
                className={styles.ordering}
              />ing
            </p>
            <p className={styles.orderText}>
              Order Accepted! Your order will be delivered shortly.
            </p>
            <span className={styles.timestamp}>now</span>
          </div>
        </div>
        <div className={styles.orderStep}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <p className={styles.orderTitle}><img
                src="/assets/LOGO 1.png"
                alt="Order.uk Logo"
                className={styles.ordering}
              />ing</p>
            <p className={styles.orderText}>
              Your rider's nearby 🚴 They're almost there – get ready!
            </p>
            <span className={styles.timestamp}>now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
