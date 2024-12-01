import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./payment.module.css";
import Navbar from "../../components/navbar";
import { useCart } from "../../context/cartContext";
import CardModal from "../../components/cardModal";
import { getCards } from "../../services";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);  // Track selected card for editing
  const navigate = useNavigate();
  const { cart } = useCart();

  // Fetch saved cards on component mount
  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const cards = await getCards();
        setSavedCards(cards);
      } catch (error) {
        console.error("Error fetching saved cards:", error.message);
      }
    };
    fetchSavedCards();
  }, []);

  const handleProceedPayment = () => {
    if (selectedPaymentMethod) {
      navigate("/order");
    } else {
      alert("Please select a payment method");
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const handleSaveCard = (cardDetails) => {
    // If it's a new card, add it to saved cards; else update the existing card
    if (selectedCard) {
      setSavedCards((prevCards) =>
        prevCards.map((card) =>
          card._id === selectedCard._id ? cardDetails : card
        )
      );
    } else {
      setSavedCards((prevCards) => [...prevCards, cardDetails]);
    }
    setSelectedPaymentMethod(cardDetails.nameOnCard); // Automatically select the new/updated card
    setIsModalOpen(false); // Close modal after saving
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
            <div className={styles.breakerline}></div>

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

            {savedCards.map((card, index) => (
              <div
                key={index}
                className={`${styles.method} ${
                  selectedPaymentMethod === card.nameOnCard
                    ? styles.selected
                    : ""
                }`}
                onClick={() => setSelectedPaymentMethod(card.nameOnCard)}
              >
                <span className={styles.methodIcon}>C</span>
                <p>{card.nameOnCard}</p>
              </div>
            ))}

            <div
              className={styles.method}
              onClick={() => {
                setSelectedCard(null); // Reset selected card for new card addition
                setIsModalOpen(true);
              }}
            >
              <span className={styles.addIcon}>+</span>
              <p>Add Debit Card</p>
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.finalPrice}>
            <div className={styles.summary}>
              <p className={styles.summaryTitle}>Amount to be paid</p>
            </div>
            <div className={styles.summary}>
              <p className={styles.amount}>
                ₹{(calculateSubtotal() + 10).toFixed(2)}
              </p>
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

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCard}
        cardDetails={selectedCard} // Pass selectedCard for editing, null for new card
      />
    </>
  );
};

export default PaymentPage;
