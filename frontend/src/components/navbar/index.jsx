/* React Component */
import React, { useState } from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className={styles.navbarWrapper}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <span className={styles.promo}>
          🌟 Get 5% Off your first order,{" "}
          <a href="#" className={styles.promoLink}>
            Promo: ORDER5
          </a>
        </span>
        <div className={styles.cartLocation}>
          <span className={styles.location}>
            📍 Regent Street, A4, A4201, London
          </span>
          <a href="#" className={styles.changeLocation}>
            Change Location
          </a>
          <button className={styles.cartBtn}>
            <div className={styles.cartCol}>🛒 My Cart</div>
            <div className={styles.cartCol}>£0.00</div>
            <div className={styles.cartCol}>⬇️</div>
          </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className={styles.bottomNavbar}>
        {/* Logo */}
        <div className={styles.brand}>
          <img
            src="/assets/LOGO 1.png"
            alt="Order.uk Logo"
            className={styles.logo}
          />
        </div>
        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {[
            "Home",
            "Browse Menu",
            "Special Offers",
            "Restaurants",
            "Track Order",
          ].map((tab) => (
            <button
              key={tab}
              className={`${styles.navButton} ${
                activeTab === tab ? styles.activeButton : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Login/Signup */}
        <button className={styles.loginBtn}>👤 Login/Signup</button>
      </div>
    </div>
  );
};

export default Navbar;
