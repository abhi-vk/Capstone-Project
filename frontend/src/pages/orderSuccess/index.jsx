import React from "react";
import { useCart } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import styles from "./orderSuccess.module.css";
import Navbar from "../../components/navbar";

const OrderSuccess = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBackToHome = () => {
    clearCart();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.iconWrapper}>
          <div className={styles.iconBorder}>
            <img
              src="/assets/CheckCircle.png"
              alt="Success"
              className={styles.icon}
            />
          </div>
        </div>

        {/* Message */}
        <h1 className={styles.title}>Order Placed Successfully</h1>
        <p className={styles.subtitle}>
          Your order is confirmed and on its way. Get set to savor your chosen delights!
        </p>

        {/* Cart Items and Button */}
        <div className={styles.content}>
          <div className={styles.itemList}>
            {cart.map((item) => (
              <p key={item._id} className={styles.item}>
                {item.itemName}
              </p>
            ))}
             <button className={styles.backButton} onClick={handleBackToHome}>
            Back to Home
          </button>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
