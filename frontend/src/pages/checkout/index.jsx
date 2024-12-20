import React, { useState, useEffect } from "react";
import { useCart } from "../../context/cartContext";
import styles from "./checkout.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Restaurants from "../../components/restaurants";
import { getAddresses } from "../../services";

const CheckoutPage = () => {
  const { cart: localCart } = useCart();
  const [cart, setCart] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState("Loading address...");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume logged in by default
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedCart = queryParams.get("cart");

    if (encodedCart) {
      try {
        const sharedCart = JSON.parse(decodeURIComponent(encodedCart));
        setCart(sharedCart);
      } catch (error) {
        console.error("Invalid cart data in URL:", error);
        setCart([]);
      }
    } else {
      setCart(localCart); // Fallback to local cart
    }

    // Check authentication status via getAddresses
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await getAddresses();
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(
          defaultAddr ? defaultAddr.addressLine : "No address set"
        );
        setIsLoggedIn(true); // User is logged in if the call succeeds
      } catch (error) {
        setDefaultAddress("No address available");
        setIsLoggedIn(false); // Assume user is not logged in if the call fails
        console.error("Error fetching addresses:", error);
      }
    };

    fetchDefaultAddress();
  }, [location.search, localCart]);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  return (
    <>
      <Navbar />
      <h2 className={styles.prevIcon}>
        <img
          onClick={() => navigate(-1)}
          className={styles.previous}
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732725891/foodapp-images/grbjojv2h5s0gzkxqkzz.png"
        />
        Your Order Details
      </h2>
      <div className={styles.checkoutContainer}>
        <div className={styles.leftSection}>
          <div className={styles.orderList}>
            {cart.map((item) => (
              <React.Fragment key={item._id}>
                <div className={styles.orderItem}>
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.itemName}</h3>
                    <p>{item.quantity}x</p>
                  </div>
                  <p className={styles.itemPrice}>₹{item.totalPrice}</p>
                </div>
                <div className={styles.line}></div>
              </React.Fragment>
            ))}
            <div className={styles.notesSection}>
              <label htmlFor="orderNotes">Notes</label>
              <input
                id="orderNotes"
                type="text"
                placeholder="Add order notes"
                className={styles.notesInput}
              ></input>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div
            className={styles.deliveryAddress}
            onClick={() => isLoggedIn && navigate("/address")}
          >
            <img src="assets/Location_1.png" />
            <button disabled={!isLoggedIn}>
              <p>Delivery Address</p>
              {defaultAddress}
            </button>
          </div>
          <div className={styles.line}></div>
          <div className={styles.priceDetails}>
            <p>
              <span>Items:</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </p>
            <p>
              <span>Sales Tax:</span>
              <span>₹10.00</span>
            </p>
            <div className={styles.line}></div>
            <p className={styles.subtotal}>
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{(calculateSubtotal() + 10).toFixed(2)}</span>
            </p>
          </div>
          <div className={styles.cartWrapper}>
            <button
              onClick={() => isLoggedIn && navigate("/payment")}
              className={`${styles.paymentButton} ${
                !isLoggedIn ? styles.paymentButtonDisabled : ""
              }`}
              disabled={!isLoggedIn}
            >
              Choose Payment Method
            </button>
            {!isLoggedIn && (
              <div className={styles.hoverMessage}>
                Please log in and add default address to proceed with payment.
              </div>
            )}
          </div>
        </div>
      </div>
      <Restaurants />
    </>
  );
};

export default CheckoutPage;
