import React from 'react';
import styles from './about.module.css';

const About = () => {
  return (
    <section className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Know more about us!</h2>
        <nav className={styles.nav}>
          <a className={styles.navItem} href="#faq">Frequent Questions</a>
          <a className={styles.navItem} href="#who-we-are">Who we are?</a>
          <a className={styles.navItem} href="#partner-program">Partner Program</a>
          <a className={styles.navItem} href="#help-support">Help & Support</a>
        </nav>
      </div>
      <div className={styles.content}>
        <div className={styles.questions}>
          <button className={styles.questionButton}>How does Order.UK work?</button>
          <ul>
            <li>What payment methods are accepted?</li>
            <li>Can I track my order in real-time?</li>
            <li>Are there any special discounts or promotions available?</li>
            <li>Is Order.UK available in my area?</li>
          </ul>
        </div>
        <div className={styles.about}>
          <div className={styles.infoCards}>
            <div className={styles.card}>
              <img src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172417/foodapp-images/ujrj3zecylxe6p67xldx.png" alt="Place an Order" />
              <h3>Place an Order!</h3>
              <p>Place order through our website or Mobile app</p>
            </div>
            <div className={styles.card}>
              <img src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172426/foodapp-images/lqqz2rrctcbzzqn8jl0a.png" alt="Track Progress" />
              <h3>Track Progress</h3>
              <p>You can track your order status with delivery time</p>
            </div>
            <div className={styles.card}>
              <img src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732172416/foodapp-images/haejdxlxchazmzqekcu5.png" alt="Get your Order!" />
              <h3>Get your Order!</h3>
              <p>Receive your order at lightning-fast speed!</p>
            </div>
          </div>
          <p className={styles.footerText}>
            Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
