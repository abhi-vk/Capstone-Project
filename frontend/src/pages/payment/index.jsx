import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./payment.module.css"; // CSS module for styling
import Navbar from "../../components/navbar";
import { useCart } from "../../context/cartContext";
import CardModal from "../../components/cardModal"; // Import CardModal component
import { getCards } from "../../services"; // Import service to fetch saved cards

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Track selected payment method
  const [savedCards, setSavedCards] = useState([]); // State to hold saved cards
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const { cart } = useCart(); // Get cart data from context

  // Fetch saved cards on component mount
  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const cards = await getCards(); // Fetch cards from backend
        setSavedCards(cards); // Update state with fetched cards
      } catch (error) {
        console.error("Error fetching saved cards:", error.message);
      }
    };
    fetchSavedCards();
  }, []);

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

  const handleSaveCard = (cardDetails) => {
    setSavedCards((prevCards) => [...prevCards, cardDetails]); // Add new card to saved cards
    setSelectedPaymentMethod(cardDetails.nameOnCard); // Automatically select the newly added card
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
            {/* Wallet Method */}
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
            <div className={styles.breakerline}></div>

            {/* Default Payment Methods */}
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

            {/* Render Saved Cards */}
            {savedCards.map((card, index) => (
              <div
                key={index}
                className={`${styles.method} ${
                  selectedPaymentMethod === card.nameOnCard ? styles.selected : ""
                }`}
                onClick={() => setSelectedPaymentMethod(card.nameOnCard)}
              >
                <span className={styles.methodIcon}>C</span>
                <p>{card.nameOnCard}</p>
              </div>
            ))}

            {/* Add Debit Card */}
            <div
              className={styles.method}
              onClick={() => setIsModalOpen(true)} // Open modal when clicked
            >
              <span className={styles.addIcon}>+</span>
              <p>Add Debit Card</p>
            </div>
          </div>
        </div>

        {/* Right Section: Payment Summary */}
        <div className={styles.rightSection}>
          <div className={styles.finalPrice}>
            <div className={styles.summary}>
              <p className={styles.summaryTitle}>Amount to be paid</p>
            </div>
            <div className={styles.summary}>
              <p className={styles.amount}>₹{(calculateSubtotal() + 10).toFixed(2)}</p>
            </div>
          </div>
          <div className={styles.breakerline}></div>
          <div style={{ position: "relative" }}>
  <button
    className={styles.proceedButton}
    onClick={handleProceedPayment}
    disabled={!selectedPaymentMethod} 
  >
    Proceed Payment
  </button>
</div>

        </div>
      </div>

      {/* CardModal Component */}
      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onSave={handleSaveCard} // Save card details
      />
    </>
  );
};

export default PaymentPage;
