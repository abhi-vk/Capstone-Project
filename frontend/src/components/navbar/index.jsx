import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./navbar.module.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [userName, setUserName] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // For dropdown visibility
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is logged in
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setUserName(null);
    setIsDropdownVisible(false); // Hide dropdown on logout
  };

  const handleLoginSignup = () => {
    navigate("/register"); // Redirect to /register
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState); // Toggle dropdown visibility
  };

  const handleProfile = () => {
    navigate("/profile"); // Navigate to profile page
    setIsDropdownVisible(false); // Hide dropdown when profile is clicked
  };

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
          <a
            href="#"
            className={styles.changeLocation}
            onClick={() => navigate("/address")}
          >
            Change Location
          </a>

          <button className={styles.cartBtn}>
            <div className={styles.cartCol}>
              <img src="/assets/Cart.png" alt="Logo" />
              <span>My Cart</span>
            </div>
            <div className={styles.cartCol}>£0.00</div>
            <div className={styles.cartCol}>
              <img src="/assets/Forward Button.png" alt="Next" />
            </div>
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
        {/* Login/Signup or User Info */}
        {userName ? (
          <div className={styles.userSection}>
            <button className={styles.profileBtn} onClick={toggleDropdown}>
              <img
                src="/assets/Male User.png"
                alt="profile"
                className={styles.userIcon}
              />
              <span className={styles.userName}>Hey, {userName}</span>
            </button>

            {/* Dropdown */}
            {isDropdownVisible && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownOption}
                  onClick={handleProfile}
                >
                  Profile
                </button>
                <button
                  className={styles.dropdownOption}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={handleLoginSignup}>
            <img
              src="/assets/Male User.png"
              alt="profile"
              className={styles.userIcon}
            />
            Login/Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
