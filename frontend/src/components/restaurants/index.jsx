import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import styles from './restaurants.module.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/restaurants')
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  // Handle card click
  const handleCardClick = (id) => {
    navigate('/products'); // Navigate to the product page with the restaurant's ID
  };

  return (
    <div>
      <h2 className={styles.heading}>Popular Restaurants</h2>
      <div className={styles.restaurantContainer}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className={styles.restaurantCard}
            onClick={() => handleCardClick(restaurant._id)} // Attach click handler
            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
          >
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className={styles.restaurantImage}
            />
            <div className={styles.restaurantName}>{restaurant.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
