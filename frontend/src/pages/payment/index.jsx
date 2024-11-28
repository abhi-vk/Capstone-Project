import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./payment.module.css"; // CSS module for styling
import Navbar from "../../components/navbar";
import { useCart } from "../../context/cartContext";


const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleProceedPayment = () => {
    if (selectedPaymentMethod) {
      navigate("/order"); // Navigate to the order success page
    } else {
      alert("Please select a payment method");
    }
  };
  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };
  return (
    <>
      <Navbar />
      <h2 className={styles.heading}>
            <img
              className={styles.backIcon}
              src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732725891/foodapp-images/grbjojv2h5s0gzkxqkzz.png"
              alt="Back"
              onClick={() => navigate(-1)}
            />
            Choose and Pay
          </h2>
      <div className={styles.paymentContainer}>
      
        {/* Left Section: Payment Methods */}
        <div className={styles.leftSection}>
          
          <div className={styles.paymentMethods}>
            <div
              className={`${styles.method} ${
                selectedPaymentMethod === "wallet" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("wallet")}
            >
              <img src="/assets/Icon.png" alt="Wallet" className={styles.icon} />
              <div>
                <h3>Wallet</h3>
                <p>Available balance: ₹300</p>
              </div>
            </div>
            <div
              className={`${styles.method} ${
                selectedPaymentMethod === "maestro" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("maestro")}
            >
              <span className={styles.methodIcon}>M</span>
              <p>MaestroCard</p>
            </div>
            <div
              className={`${styles.method} ${
                selectedPaymentMethod === "paypal" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("paypal")}
            >
              <span className={styles.methodIcon}>P</span>
              <p>Paypal</p>
            </div>
            <div
              className={`${styles.method} ${
                selectedPaymentMethod === "stripe" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("stripe")}
            >
              <span className={styles.methodIcon}>S</span>
              <p>Stripe</p>
            </div>
            <div
              className={`${styles.method} ${
                selectedPaymentMethod === "debit" ? styles.selected : ""
              }`}
              onClick={() => setSelectedPaymentMethod("debit")}
            >
              <span className={styles.addIcon}>+</span>
              <p>Add Debit Card</p>
            </div>
          </div>
        </div>

        {/* Right Section: Payment Summary */}
        <div className={styles.rightSection}>
          <div className={styles.summary}>
            <p className={styles.summaryTitle}>Amount to be payed</p>
            <p className={styles.amount}>₹{(calculateSubtotal() + 10).toFixed(2)}</p>
          </div>
          <button
            className={styles.proceedButton}
            onClick={handleProceedPayment}
            disabled={!selectedPaymentMethod} // Disable if no method selected
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
