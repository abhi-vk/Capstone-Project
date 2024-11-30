import React from 'react';
import styles from './data.module.css';

const Data = () => {
  return (
    <div className={styles.container}>
      <div className={styles.stat}>
        <h3>546+</h3>
        <p>Registered Riders</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <h3>789,900+</h3>
        <p>Orders Delivered</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <h3>690+</h3>
        <p>Restaurants Partnered</p>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <h3>17,457+</h3>
        <p>Food Items</p>
      </div>
    </div>
  );
};

export default Data;
