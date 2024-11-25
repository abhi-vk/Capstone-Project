import React, { useState } from "react";
import styles from "./deals.module.css";

const Deals = () => {
  const [activeOption, setActiveOption] = useState("Pizza & Fast food");

  const options = ["Vegan", "Sushi", "Pizza & Fast food", "Others"];

  const categoryData = [
    {
      name: "Burgers & Fast food",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172401/foodapp-images/trblrbkcdwetcrdyoolz.png",
    },
    {
      name: "Salads",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172424/foodapp-images/wybhunr3yaml6c7uyzm6.png",
    },
    {
      name: "Pasta & Casuals",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172420/foodapp-images/yy5mdandg8nad6hhgeht.png",
    },
    {
      name: "Pizza",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172421/foodapp-images/zvrxzqqzxvdvglxo70o5.png",
    },
    {
      name: "Breakfast",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172399/foodapp-images/totzfl5kih9vzsmnjrwk.png",
    },
    {
      name: "Soups",
      image:
        "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172425/foodapp-images/i4q5sjooub0qjhpsaiss.png",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <h1>
          Up to <span className={styles.discount}>-40%</span> 🎉 Order.uk
          exclusive deals
        </h1>
        <div className={styles.nav}>
          {options.map((option) => (
            <span
              key={option}
              className={activeOption === option ? styles.active : ""}
              onClick={() => setActiveOption(option)}
            >
              {option}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.dealsGrid}>
        {[
          {
            name: "Chef Burgers London",
            discount: "-40%",
            image:
              "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172406/foodapp-images/w4d3orans3e00urrtwbj.png",
          },
          {
            name: "Grand Ai Cafe London",
            discount: "-20%",
            image:
              "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172404/foodapp-images/qfumbvkdu2cqqmifh2n7.png",
          },
          {
            name: "Butterbrot Cafe London",
            discount: "-17%",
            image:
              "https://res.cloudinary.com/dslmuge4f/image/upload/v1732172406/foodapp-images/w4d3orans3e00urrtwbj.png",
          },
        ].map((deal, index) => (
          <div key={index} className={styles.dealCard}>
            <div className={styles.discountBadge}>{deal.discount}</div>
            <img src={deal.image} alt={deal.name} />
            <div className={styles.overlay}>
              <p className={styles.restaurantText}>Restaurant</p>
              <h3>{deal.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <h1 className={styles.categoriesHeading}>Order.uk Popular Categories 😋</h1>
      <div className={styles.categoriesGrid}>
        {categoryData.map((category, index) => (
          <div className={styles.categoryCard} key={index}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <p>{Math.floor(Math.random() * 40 + 1)} Restaurants</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
