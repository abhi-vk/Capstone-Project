import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <img
            src="/assets/LOGO 2.png"
            alt="Order.uk Logo"
            className={styles.logo}
          />
          <div className={styles.appLinks}>
            <img src="/assets/app-store-badges-en 1.png" alt="App Store" />
          </div>
          <p className={styles.companyDetails}>
            Company # 490039-445, Registered with House of Companies.
          </p>
        </div>

        {/* Middle Section */}
        {/* Middle Section */}
        <div className={styles.middleSection}>
          <h2>Get Exclusive Deals in your Inbox</h2>
          <div className={styles.subscription}>
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
          <p className={styles.disclaimer}>
            we wont spam, read our{" "}
            <a href="/email-policy" className={styles.link}>
              email policy
            </a>
          </p>

          <div className={styles.socialLinks}>
            <img src="/assets/Snapchat.png" alt="Snapchat" />
            <img src="/assets/TikTok.png" alt="TikTok" />
            <img src="/assets/Instagram.png" alt="Instagram" />
            <img src="/assets/Facebook.png" alt="Facebook" />
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>
          <div className={styles.linkColumn}>
            <h3>Legal Pages</h3>
            <a href="/terms">Terms and conditions</a>
            <a href="/privacy">Privacy</a>
            <a href="/cookies">Cookies</a>
            <a href="/modern-slavery">Modern Slavery Statement</a>
          </div>
          <div className={styles.linkColumn}>
            <h3>Important Links</h3>
            <a href="/help">Get help</a>
            <a href="/add-restaurant">Add your restaurant</a>
            <a href="/signup-delivery">Sign up to deliver</a>
            <a href="/create-business-account">Create a business account</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
        <div className={styles.footerLinks}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/pricing">Pricing</a>
          <a href="/do-not-sell">
            Do not sell or share my personal information
          </a>
        </div>
      </div>
    </footer>
  );
}
