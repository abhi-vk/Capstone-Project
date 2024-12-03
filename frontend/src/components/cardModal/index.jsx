import React, { useState, useEffect } from "react";
import styles from "./card.module.css";

const CardModal = ({ isOpen, onClose, onSave, cardDetails: selectedCard }) => {
  const [cardDetails, setCardDetails] = useState({
    lastFourDigits: "",
    expiration: "",
    cvc: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const newErrors = {};

    if (cardDetails.lastFourDigits.length !== 4 || isNaN(cardDetails.lastFourDigits)) {
      newErrors.lastFourDigits = "Card number must be exactly 4 digits.";
    }

    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!expirationRegex.test(cardDetails.expiration)) {
      newErrors.expiration = "Expiration must be in MM/YY format.";
    }

    if (cardDetails.cvc.length !== 3 || isNaN(cardDetails.cvc)) {
      newErrors.cvc = "CVC must be exactly 3 digits.";
    }

    if (!cardDetails.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lastFourDigits" && value.length > 4) return;
    if (name === "cvc" && value.length > 3) return;

    setCardDetails({ ...cardDetails, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  const handleSave = async () => {
    if (!validate()) return; // Stop if validation fails

    try {
      setIsLoading(true);
      await onSave(cardDetails); 
      window.location.reload();
      onClose();
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
        <h2 className={styles.modalTitle}>Payment Card Details</h2>
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
            {errors.lastFourDigits && (
              <span className={styles.errorMessage}>{errors.lastFourDigits}</span>
            )}
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
            {errors.expiration && (
              <span className={styles.errorMessage}>{errors.expiration}</span>
            )}
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
            {errors.cvc && (
              <span className={styles.errorMessage}>{errors.cvc}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Name on Card</label>
            <input
              className={styles.input}
              type="text"
              name="nameOnCard"
              value={cardDetails.nameOnCard}
              onChange={handleChange}
            />
            {errors.nameOnCard && (
              <span className={styles.errorMessage}>{errors.nameOnCard}</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        
      </div>
      
    </div>
  );
};

export default CardModal;
