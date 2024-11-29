import { useState, useEffect } from "react";
import styles from "./profile.module.css";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    country: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Load data from localStorage
    const name = localStorage.getItem("name") || "";
    const email = localStorage.getItem("email") || "";
    const gender = localStorage.getItem("gender") || "";
    const country = localStorage.getItem("country") || "";
    setFormData({ name, email, gender, country });
  }, []);

  const handleSave = () => {
    // Save updated data to localStorage
    localStorage.setItem("name", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("gender", formData.gender);
    localStorage.setItem("country", formData.country);

    setIsEditing(false); // Toggle back to edit mode
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h2 className={styles.prevIcon}>
      <img
          onClick={() => navigate(-1)}
          className={styles.previous}
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732725891/foodapp-images/grbjojv2h5s0gzkxqkzz.png"
        />
        My Profile
        </h2>
      <div className={styles.profileSection}>
        {/* Profile Image */}
        <img
          src="https://res.cloudinary.com/dslmuge4f/image/upload/v1732882516/foodapp-images/ds6azym6cijwvdoci1me.png"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.profileFields}>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
        <button
          className={styles.editButton}
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      <hr className={styles.divider} />

      {/* Saved Payment Methods */}
      <div className={styles.paymentSection}>
        <h3>Saved Payment Methods</h3>
        <div className={styles.addCard}>
          <button className={styles.addCardButton}>+ Add New Card</button>
        </div>
      </div>
    </div>
    </>
  );
}
