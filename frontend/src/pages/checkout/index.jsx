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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the cart is passed via URL parameters
    const queryParams = new URLSearchParams(location.search);
    const encodedCart = queryParams.get("cart");

    if (encodedCart) {
      try {
        const sharedCart = JSON.parse(decodeURIComponent(encodedCart));
        setCart(sharedCart); // Use shared cart
      } catch (error) {
        console.error("Invalid cart data in URL:", error);
        setCart([]); // Fallback to empty cart if URL data is invalid
      }
    } else {
      setCart(localCart); // Fallback to local cart
    }
  }, [location.search, localCart]);

  // Fetch the default address when the component mounts
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await getAddresses();
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(
          defaultAddr ? defaultAddr.addressLine : "No address set"
        );
      } catch (error) {
        setDefaultAddress("Error fetching address");
        console.error("Error fetching addresses:", error);
      }
    };

    fetchDefaultAddress();
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const isReadOnly = new URLSearchParams(location.search).has("cart");

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
              <>
                <div key={item._id} className={styles.orderItem}>
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
              </>
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
          <div className={styles.deliveryAddress} onClick={() => navigate("/address")}>
            <img src="assets/Location_1.png" />
            <button  disabled={isReadOnly}>
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
          {!isReadOnly && (
            <button
              onClick={() => navigate("/payment")}
              className={styles.paymentButton}
            >
              Choose Payment Method
            </button>
          )}
        </div>
      </div>
      <Restaurants />
    </>
  );
};

export default CheckoutPage;
