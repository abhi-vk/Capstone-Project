import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../../services'; // Import the service function
import styles from './restaurants.module.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch restaurants using the service function
    getRestaurants()
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  const handleCardClick = (id) => {
    navigate('/products'); // Navigate to the product page with the restaurant's ID
  };

  return (
    <div>
      <h1 className={styles.heading}>Popular Restaurants</h1>
      <div className={styles.restaurantContainer}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className={styles.restaurantCard}
            onClick={() => handleCardClick(restaurant._id)}
            style={{ cursor: 'pointer' }}
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
