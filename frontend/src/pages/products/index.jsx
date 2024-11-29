import React, { useState, useEffect } from "react";
import { getCategories, getFoodItemsByCategory } from "../../services";
import styles from "./products.module.css";
import Navbar from "../../components/navbar";
import Restaurants from "../../components/restaurants";
import Offers from "../../components/offers";
import Map from "../../components/map";
import { useCart } from "../../context/cartContext"; // Importing useCart hook to manage cart state
import CartModal from "../../components/cartModal"; // Importing CartModal component
import { ToastContainer, toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles
import Review from "../../components/reviews";
import DeliveryInfo from "../../components/deliveryInfo";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [foodItemsByCategory, setFoodItemsByCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartModalVisible, setIsCartModalVisible] = useState(false); // Manage cart modal visibility
  const { cart, addToCart } = useCart(); // Access cart context

  useEffect(() => {
    // Fetch categories
    getCategories()
      .then((data) => {
        setCategories(data);

        // Fetch food items for each category
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to toggle the cart modal visibility
  const toggleCartModal = () => {
    setIsCartModalVisible((prevState) => !prevState);
  };

  // Function to add item to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.itemName} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* Toast container for displaying toasts */}

      {/* Search Section */}
      <div className={styles.searchSection}>
        <h1 className={styles.searchTitle}>
          All Offers from McDonald’s East London
        </h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="🔍 Search from menu..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Offers Section */}
      <Offers />

      {/* Categories and Food Items */}
      <div className={styles.container}>
        {categories.map((category) => (
          <div key={category._id} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category.categoryName}</h2>
            <div className={styles.cardGrid}>
              {foodItemsByCategory[category._id]
                ?.filter((item) =>
                  item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <div className={styles.card} key={item._id}>
                    {/* Left Section */}
                    <div className={styles.cardLeft}>
                      <h3 className={styles.cardTitle}>{item.itemName}</h3>
                      <p className={styles.cardDescription}>{item.description}</p>
                      <span className={styles.cardPrice}>₹ {item.price}</span>
                    </div>

                    {/* Right Section */}
                    <div className={styles.cardRight}>
                      <img
                        src={item.imageUrl}
                        alt={item.itemName}
                        className={styles.cardImage}
                      />
                      <button
                        className={styles.addButton}
                        onClick={() => handleAddToCart(item)} // Add to cart functionality
                      >
                        <span className={styles.addIcon}>+</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <DeliveryInfo/>
      {/* Map Section */}
      <Map />
      <Review/>

      {/* Restaurants Section */}
      <Restaurants />

      {/* Cart Modal */}
      <CartModal
        isVisible={isCartModalVisible}
        onClose={toggleCartModal}
      />
    </>
  );
};

export default Products;
