import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
import CardModal from "../../components/cardModal";
import { getCards, addCard, updateCard } from "../../services";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardsFromDB = async () => {
      try {
        const cards = await getCards();
        setSavedCards(cards);
      } catch (error) {
        console.error("Error fetching cards:", error.message);
      }
    };

    fetchCardsFromDB();

    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    const gender = localStorage.getItem("gender") || "";
    const country = localStorage.getItem("country") || "";
    setFormData({ name, email, gender, country });
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("name", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("gender", formData.gender);
    localStorage.setItem("country", formData.country);

    setIsEditing(false);
  };

  const handleSaveCard = async (cardDetails) => {
    try {
      if (selectedCard) {
        const updatedCard = await updateCard(selectedCard._id, cardDetails);
        setSavedCards((prevCards) =>
          prevCards.map((card) =>
            card._id === selectedCard._id ? updatedCard : card
          )
        );
      } else {
        const newCard = await addCard(cardDetails);
        setSavedCards((prevCards) => [...prevCards, newCard]);
      }
    } catch (error) {
      console.error("Error saving card:", error.message);
    } finally {
      setIsModalOpen(false);
      setSelectedCard(null);
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
          <div className={styles.profileInfo}>
            <h3>{formData.name}</h3>
            
            
          </div>
          <div> <button
              className={styles.editButton}
              onClick={() => {
                if (isEditing) handleSaveProfile();
                else setIsEditing(true);
              }}
            >
              {isEditing ? "Save" : "Edit"}
            </button></div>
        </div>
        
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

        <hr className={styles.divider} />

        <div className={styles.paymentSection}>
          <h3>Saved Payment Methods</h3>
          <div className={styles.cardList}>
            {savedCards.map((card) => (
              <div key={card._id} className={styles.card}>
                  <img src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732996093/foodapp-images/jmvbmre4bysfzexy1nur.png"/> 

                <div className={styles.cardDetails}>
                 <p>{`XXXX XXXX XXXX ${card.lastFourDigits}`}</p>
                  <span>{card.nameOnCard}</span>
                </div>
                <button
                  className={styles.editIcon}
                  onClick={() => {
                    setSelectedCard(card);
                    setIsModalOpen(true);
                  }}
                >
                  ✏️
                </button>
              </div>
            ))}
            <button
              className={styles.addCardButton}
              onClick={() => {
                setSelectedCard(null);
                setIsModalOpen(true);
              }}
            >
              + Add New Card
            </button>
          </div>
        </div>
      </div>

      <CardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCard}
        cardDetails={selectedCard}
      />
    </>
  );
}
