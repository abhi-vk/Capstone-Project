import React, { useState, useEffect } from "react";
import { getCategories, getFoodItemsByCategory } from "../../services";
import styles from "./products.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Restaurants from '../../components/restaurants';

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [foodItemsByCategory, setFoodItemsByCategory] = useState({});

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);

        data.forEach((category) => {
          getFoodItemsByCategory(category._id)
            .then((items) => {
              setFoodItemsByCategory((prevItems) => ({
                ...prevItems,
                [category._id]: items,
              }));
            })
            .catch((error) => console.error("Error fetching food items:", error));
        });
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {categories.map((category) => (
          <div key={category._id} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.categoryName}</h2>
            <div className={styles.cardGrid}>
              {foodItemsByCategory[category._id]?.map((item) => (
                <div className={styles.card} key={item._id}>
                  {/* Left section */}
                  <div className={styles.cardLeft}>
                    <h3 className={styles.cardTitle}>{item.itemName}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                    <span className={styles.cardPrice}>₹ {item.price}</span>
                  </div>

                  {/* Right section */}
                  <div className={styles.cardRight}>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className={styles.cardImage}
                    />
                    <button className={styles.addButton}>
                      <span className={styles.addIcon}>+</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Restaurants/>
      
    </>
  );
};

export default Products;
