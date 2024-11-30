import React, { useState, useEffect } from "react";
import styles from "./card.module.css";
import { addCard } from "../../services";

const CardModal = ({ isOpen, onClose, onSave, cardDetails: selectedCard }) => {
  const [cardDetails, setCardDetails] = useState({
    lastFourDigits: "",
    expiration: "",
    cvc: "",
    nameOnCard: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      setCardDetails(selectedCard); // Populate modal with selected card details
    } else {
      setCardDetails({
        lastFourDigits: "",
        expiration: "",
        cvc: "",
        nameOnCard: "",
      });
    }
  }, [selectedCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lastFourDigits" && value.length > 4) return;

    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handleSave = async () => {
    if (cardDetails.lastFourDigits.length !== 4) {
      alert("Card number must include 4 digits.");
      return;
    }
    try {
      setIsLoading(true);
      await onSave(cardDetails); // Call parent onSave
      onClose();
      window.location.reload();
    } catch (error) {
      alert("Error saving card: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2 className={styles.modalTitle}>Add/Edit Card Details</h2>
        <form>
          <div className={styles.formGroup}>
            <label className={styles.label}>Card Number</label>
            <div className={styles.cardNumberInput}>
              <span className={styles.cardNumberStatic}>XXXX XXXX XXXX</span>
              <input
                className={`${styles.input} ${styles.lastFourDigits}`}
                type="text"
                name="lastFourDigits"
                maxLength="4"
                placeholder="1234"
                value={cardDetails.lastFourDigits}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Expiration</label>
            <input
              className={styles.input}
              type="text"
              name="expiration"
              placeholder="MM/YY"
              value={cardDetails.expiration}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CVC</label>
            <input
              className={styles.input}
              type="text"
              name="cvc"
              maxLength="3"
              placeholder="123"
              value={cardDetails.cvc}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Name on Card</label>
            <input
              className={styles.input}
              type="text"
              name="nameOnCard"
              placeholder="John Doe"
              value={cardDetails.nameOnCard}
              onChange={handleChange}
            />
          </div>
        </form>

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
