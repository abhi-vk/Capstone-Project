import React from 'react';
import styles from './herocard.module.css';

const HeroCard = () => {
  return (
    <div className={styles.heroCard}>
      {/* Background Image */}
      <div
        className={styles.backgroundImage}
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dslmuge4f/image/upload/v1732946939/foodapp-images/uulgkbnf560qe3kcqpcp.png")`,
        }}
      ></div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <div className={styles.subtitle}>I'm lovin' it!</div>
          <div className={styles.title}>McDonald’s East London</div>
          <div className={styles.iconsRow}>
            <div className={styles.iconBox}>
              <img src="assets/Order Completed.png" alt="Order Icon" className={styles.icon} />
              <span>Minimum Order: 12 GBP</span>
            </div>
            <div className={styles.iconBox}>
              <img src="assets/Motocross.png" alt="Scooter Icon" className={styles.icon} />
              <span>Delivery in 20–25 Minutes</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.burgerImageContainer}>
            <img
              src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732946939/foodapp-images/uulgkbnf560qe3kcqpcp.png"
              alt="Burger"
              className={styles.burgerImage}
            />
            {/* Rating Box */}
            <div className={styles.ratingBox}>
              <div className={styles.rating}>3.4</div>
              <div className={styles.stars}>
                <span className={styles.star}></span>
                <span className={styles.star}></span>
                <span className={styles.star}></span>
                <span className={styles.star}></span>
                <span className={`${styles.star} ${styles.inactiveStar}`}></span>
              </div>
              <div className={styles.reviews}>1,360 reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Until Label */}
      <div className={styles.deliveryDetails}>
      <img src="assets/Clock (1).png" alt="Order Icon" className={styles.icon} />

        Open until 3:00 AM
        </div>
    </div>
  );
};

export default HeroCard;
