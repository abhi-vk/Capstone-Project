import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import CardModal from "../../components/cardModal";
import { getCards, addCard, updateCard } from "../../services"; // Import API functions

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savedCards, setSavedCards] = useState([]); // Holds cards fetched from the backend
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [selectedCard, setSelectedCard] = useState(null); // Card selected for editing
  const navigate = useNavigate();

  // Fetch profile and cards on component mount
  useEffect(() => {
    // Fetch cards from the backend
    const fetchCardsFromDB = async () => {
      try {
        const cards = await getCards(); // Fetch cards
        setSavedCards(cards); // Update state
      } catch (error) {
        console.error("Error fetching cards:", error.message);
      }
    };

    fetchCardsFromDB();

    // Mock fetching profile data (replace with actual API call if needed)
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    const gender = localStorage.getItem("gender") || "";
    const country = localStorage.getItem("country") || "";
    setFormData({ name, email, gender, country });
  }, []);

  const handleSaveProfile = () => {
    // Save profile data to localStorage
    localStorage.setItem("name", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("gender", formData.gender);
    localStorage.setItem("country", formData.country);

    setIsEditing(false); // Toggle back to view mode
  };

  const handleSaveCard = async (cardDetails) => {
    try {
      if (selectedCard) {
        // Update existing card in the database
        const updatedCard = await updateCard(selectedCard._id, cardDetails);
        setSavedCards((prevCards) =>
          prevCards.map((card) =>
            card._id === selectedCard._id ? updatedCard : card
          )
        );
        window.location.reload();
      } else {
        // Add new card to the database
        const newCard = await addCard(cardDetails);
        setSavedCards((prevCards) => [...prevCards, newCard]);
        
      }
    } catch (error) {
      console.error("Error saving card:", error.message);
    } finally {
      setIsModalOpen(false); // Close modal
      setSelectedCard(null); // Reset selected card
    }
  };
  
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            onClick={() => navigate(-1)}
            className={styles.backIcon}
            src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732725891/foodapp-images/grbjojv2h5s0gzkxqkzz.png"
            alt="Back"
          />
          <h2>My Profile</h2>
        </div>

        <div className={styles.profileCard}>
          <img
            src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732882516/foodapp-images/ds6azym6cijwvdoci1me.png"
            alt="Profile"
            className={styles.profileImage}
          />

          <div className={styles.formSection}>
            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.inputGroup}>
                <label>Gender</label>
                <input
                  type="text"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          <button
            className={styles.editButton}
            onClick={() => {
              if (isEditing) handleSaveProfile();
              else setIsEditing(true);
            }}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <hr className={styles.divider} />

        {/* Payment Section */}
        <div className={styles.paymentSection}>
          <h3>Saved Payment Methods</h3>
          <div className={styles.cardList}>
            {savedCards.map((card) => (
              <div key={`${card._id}`} className={styles.card}>

                <div className={styles.cardDetails}>
                  {/* Mask all but the last 4 digits of the card number */}
                  <p>{`XXXX XXXX XXXX ${card.lastFourDigits}`}</p>
                  <span>{card.nameOnCard}</span>{" "}
                  {/* If you don't need the name, remove this line */}
                </div>
                <button
                  className={styles.editIcon}
                  onClick={() => {
                    setSelectedCard(card); // Set the selected card for editing
                    setIsModalOpen(true); // Open modal
                  }}
                >
                  ✏️
                </button>
              </div>
            ))}
            <button
              className={styles.addCardButton}
              onClick={() => {
                setSelectedCard(null); // Reset selected card for adding a new card
                setIsModalOpen(true); // Open modal
              }}
            >
              + Add New Card
            </button>
          </div>
        </div>
      </div>

      {/* CardModal Component */}
      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCard}
        cardDetails={selectedCard} // Pass selected card for editing
      />
    </>
  );
}
