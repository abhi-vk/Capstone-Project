import React from 'react';
import styles from './design.module.css';

const Design= () => {
  return (
    <div className={styles.container}>
      {/* Card 1 */}
      <div className={styles.card}>
        <div className={`${styles.overlay} ${styles.overlayLeft}`} />
        <img 
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172419/foodapp-images/v2lmqdiyswdhyf2h8eas.png" 
          alt="Chef" 
          className={styles.image} 
        />
        <div className={styles.content}>
          <h6>Earn more with lower fees</h6>
          <p>Signup as a business</p>
          <h2>Partner with us</h2>
          <button className={styles.button}>Get Started</button>
        </div>
      </div>

      {/* Card 2 */}
      <div className={styles.card}>
        <div className={`${styles.overlay} ${styles.overlayRight}`} />
        <img 
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172423/foodapp-images/brzxaneaupbeq75lha1y.png" 
          alt="Rider" 
          className={styles.image} 
        />
        
        <div className={styles.content}>
        <h6>Avail exclusive perks</h6>
          <p>Signup as a rider</p>
          <h2>Ride with us</h2>
          <button className={styles.button}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Design;
