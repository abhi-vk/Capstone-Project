import React from 'react';
import styles from './delivery.module.css';

const DeliveryInfo = () => {
  return (
    <div className={styles.infoContainer}>
      {/* Delivery Information */}
      <div className={styles.infoSection} style={{ backgroundColor: '#FBFBFB' }}>
        <div className={styles.header}>
          <img src="assets/Tracking.png" alt="Delivery Logo" className={styles.icon} />
          <h2>Delivery information</h2>
        </div>
        <ul>
          <li><strong>Monday:</strong> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM</li>
          <li><strong>Tuesday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Wednesday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Thursday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Friday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Saturday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Sunday:</strong> 8:00 AM–12:00 AM</li>
          <li><strong>Estimated time until delivery:</strong> 20 min</li>
        </ul>
      </div>

      {/* Contact Information */}
      <div className={styles.infoSection} style={{ backgroundColor: '#FBFBFB' }}>
        <div className={styles.header}>
          <img src="assets/ID Verified.png" alt="Contact Logo" className={styles.icon} />
          <h2>Contact information</h2>
        </div>
        <p>If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.</p>
        <p><strong>Phone number:</strong> +934443-43</p>
        <p><strong>Website:</strong> <a href="http://mcdonalds.uk/" target="_blank" rel="noopener noreferrer">http://mcdonalds.uk/</a></p>
      </div>

      {/* Operational Times */}
      <div className={styles.infoSection} style={{ backgroundColor: '#03081F', color: '#FFFFFF' }}>
        <div className={styles.header}>
          <img src="assets/Clock.png" alt="Clock Logo" className={styles.icon} />
          <h2>Operational Times</h2>
        </div>
        <ul>
          <li><strong>Monday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Tuesday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Wednesday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Thursday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Friday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Saturday:</strong> 8:00 AM–3:00 AM</li>
          <li><strong>Sunday:</strong> 8:00 AM–3:00 AM</li>
        </ul>
      </div>
    </div>
  );
};

export default DeliveryInfo;
