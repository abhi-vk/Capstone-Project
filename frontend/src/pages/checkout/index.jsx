import React, { useState, useEffect } from "react";
import { useCart } from "../../context/cartContext";
import styles from "./checkout.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Restaurants from "../../components/restaurants";
import { getAddresses } from "../../services"; // Import the existing service to fetch addresses

const CheckoutPage = () => {
  const { cart } = useCart();
  const [defaultAddress, setDefaultAddress] = useState("Loading address...");
  const navigate = useNavigate();

  // Fetch the default address when the component mounts
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      try {
        const addresses = await getAddresses();
        const defaultAddr = addresses.find((addr) => addr.isDefault);
        setDefaultAddress(defaultAddr ? defaultAddr.addressLine : "No address set");
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

  return (
    <>
      <Navbar />
      <h2>
        <img
          onClick={() => navigate(-1)}
          className={styles.previous}
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732725891/foodapp-images/grbjojv2h5s0gzkxqkzz.png"
        />
        Your Order Details
      </h2>
      <div className={styles.checkoutContainer}>
        {/* Left Section: Order Details */}
        <div className={styles.leftSection}>
          <div className={styles.orderList}>
            {cart.map((item) => (
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
            ))}
          </div>
          <div className={styles.notesSection}>
            <textarea placeholder="Add order notes" className={styles.notesInput}></textarea>
          </div>
        </div>

        {/* Right Section: Payment Details */}
        <div className={styles.rightSection}>
          <div className={styles.deliveryAddress}>
            <img className={styles.location} src="/assets/Location_1.png" alt="Location" />
            <p>Delivery Address</p>
            <button onClick={() => navigate("/address")}>
              {defaultAddress}
            </button>
          </div>
          <div className={styles.priceDetails}>
            <p>
              <span>Items:</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </p>
            <p>
              <span>Sales Tax:</span>
              <span>₹10.00</span>
            </p>
            <p className={styles.subtotal}>
              <span>Subtotal ({cart.length} items):</span>
              <span>₹{(calculateSubtotal() + 10).toFixed(2)}</span>
            </p>
          </div>
          <button className={styles.paymentButton}>Choose Payment Method</button>
        </div>
      </div>
      <Restaurants />
    </>
  );
};

export default CheckoutPage;
