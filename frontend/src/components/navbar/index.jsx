import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAddresses } from "../../services"; // Import the existing service
import styles from "./navbar.module.css";
import { useCart } from "../../context/cartContext"; // Import the useCart hook to access the CartContext
import CartModal from "../cartModal"; // Import CartModal component

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [userName, setUserName] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState("Loading address...");
  const [isCartModalVisible, setIsCartModalVisible] = useState(false); // State to manage the cart modal visibility
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useCart(); // Access cart context

  useEffect(() => {
    // Fetch the default address
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await getAddresses();
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(defaultAddr ? defaultAddr.addressLine : "No address set");
      } catch (error) {
        setDefaultAddress(" Default address not set yet");
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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    setUserName(null);
    setIsDropdownVisible(false);
  };

  const handleLoginSignup = () => {
    navigate("/register");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prevState) => !prevState);
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsDropdownVisible(false);
  };

  const totalPrice = cart.reduce((total, item) => total + item.totalPrice, 0); // Calculate the total price

  // Function to toggle the cart modal visibility
  const toggleCartModal = () => {
    setIsCartModalVisible((prevState) => !prevState);
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
            <img src="/assets/Location.png" alt="Logo" /> {defaultAddress}
          </span>
          <a
            href="#"
            className={styles.changeLocation}
            onClick={() => navigate("/address")}
          >
            Change Location
          </a>

          {/* Cart Button */}
          <button className={styles.cartBtn} onClick={toggleCartModal}>
            <div className={styles.cartCol}>
              <img src="/assets/Cart.png" alt="Logo" />
              <span>My Cart</span>
            </div>
            <div className={styles.cartCol}>£{totalPrice.toFixed(2)}</div>
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

      {/* Cart Modal */}
      <CartModal
        isVisible={isCartModalVisible}
        onClose={toggleCartModal}
      />
    </div>
  );
};

export default Navbar;
