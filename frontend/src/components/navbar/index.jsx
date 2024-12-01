import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAddresses } from "../../services";
import styles from "./navbar.module.css";
import { useCart } from "../../context/cartContext";
import CartModal from "../cartModal";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [userName, setUserName] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for the collapsible menu
  const [defaultAddress, setDefaultAddress] = useState("Loading address...");
  const navigate = useNavigate();
  const { cart } = useCart(); // Access cart context

  const menuRef = useRef(null); // Ref for the menu container

  useEffect(() => {
    // Fetch the default address
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await getAddresses();
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(defaultAddr ? defaultAddr.addressLine : "No address set");
      } catch (error) {
        setDefaultAddress("Default address not set yet");
        console.error("Error fetching addresses:", error);
      }
    };

    fetchDefaultAddress();
  }, []);

  useEffect(() => {
    // Check if the user is logged in
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserName(null);
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleCartModal = () => {
    setIsCartModalVisible((prev) => !prev);
  };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from propagating to window
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = (e) => {
    // Close the menu when clicking outside
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  useEffect(() => {
    // Close menu when clicking outside of the navbar
    if (isMenuOpen) {
      window.addEventListener("click", closeMenu);
    } else {
      window.removeEventListener("click", closeMenu);
    }

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

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
            <img src="/assets/Location.png" alt="Location" />
            {defaultAddress}
          </span>
          <a
            href="#"
            className={styles.changeLocation}
            onClick={() => navigate("/address")}
          >
            Change Location
          </a>
          <button className={styles.cartBtn} onClick={toggleCartModal}>
            <div className={styles.cartCol}>
              <img src="/assets/Cart.png" alt="Cart" />
              <span>My Cart</span>
            </div>
            <div className={styles.cartCol}>£{totalPrice.toFixed(2)}</div>
            <div className={styles.cartCol}>
              <img src="/assets/Forward Button.png" alt="Forward" />
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
            alt="Logo"
            className={styles.logo}
          />
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <div />
          <div />
          <div />
        </div>

        {/* Navigation Links */}
        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ""}`}
          ref={menuRef} // Add ref to the navLinks container
        >
          {["Home", "Special Offers", "Restaurants", "Track Order"].map((tab) => (
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

        {/* User Info */}
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
            {isDropdownVisible && (
              <div className={styles.dropdownMenu}>
                <button className={styles.dropdownOption} onClick={() => navigate("/profile")}>
                  Profile
                </button>
                <button className={styles.dropdownOption} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={() => navigate("/register")}>
            <img
              src="/assets/Male User.png"
              alt="profile"
              className={styles.userIcon}
            />
            Login/Signup
          </button>
        )}
      </div>

      {/* Cart Modal */}
      <CartModal isVisible={isCartModalVisible} onClose={toggleCartModal} />
    </div>
  );
};

export default Navbar;
