import React, { useState } from "react";
import styles from "./offers.module.css";

const Offers = () => {
  const [activeTab, setActiveTab] = useState("Offers");

  const tabs = ["Offers", "Burgers", "Fries", "Snacks", "Salads", "Cold drinks", "Happy Meal®", "Desserts", "Hot drinks", "Sauces", "Orbit®"];
  
  const offers = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dslmuge4f/image/upload/v1732600158/foodapp-images/miehm9qq9lkabaw8zpkk.png", // Path to your first image
      title: "McDonald’s East London",
      description: "First Order Discount",
      discount: "-20%",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dslmuge4f/image/upload/v1732600158/foodapp-images/pkabvea4cjvilmmaf9dq.png", // Path to your second image
      title: "McDonald’s East London",
      description: "Vegan Discount",
      discount: "-20%",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dslmuge4f/image/upload/v1732600158/foodapp-images/mthh6nrckldwqowzras7.png", // Path to your third image
      title: "McDonald’s East London",
      description: "Free Ice Cream Offer",
      discount: "-100%",
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.navBar}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Offers Cards */}
      <div className={styles.cardsContainer}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={styles.card}
            style={{ backgroundImage: `url(${offer.image})`}}
          >
            <div className={styles.overlay}>
              <span className={styles.offerBadge}>{offer.discount}</span>
            </div>
            <div className={styles.cardContent}>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
