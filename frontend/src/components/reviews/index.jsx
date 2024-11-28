import React, { useState } from "react";
import styles from "./reviews.module.css";

const reviews = [
  {
    name: "St Glx",
    location: "South London",
    date: "24th September, 2023",
    rating: 5,
    review:
      "The positive aspect was undoubtedly the efficiency of the service.",
    image: "/assets/Ellipse 3.png",
  },
  {
    name: "Jane Doe",
    location: "North London",
    date: "18th October, 2023",
    rating: 4,
    review:
      "Great service overall, but the seating area could have been cleaner.",
    image: "/assets/Ellipse 3.png",
  },
  {
    name: "John Smith",
    location: "East London",
    date: "5th November, 2023",
    rating: 4,
    review: "Food was good, but the waiting time could be reduced.",
    image: "/assets/Ellipse 3.png",
  },
  {
    name: "Alice Lee",
    location: "West London",
    date: "12th November, 2023",
    rating: 5,
    review: "Amazing food! Loved the ambiance and the quick service.",
    image: "/assets/Ellipse 3.png",
  },
  {
    name: "Mark Johnson",
    location: "Central London",
    date: "20th November, 2023",
    rating: 3,
    review: "Average experience, food was cold, but staff was friendly.",
    image: "/assets/Ellipse 3.png",
  },
  {
    name: "Emily Clark",
    location: "Southwest London",
    date: "25th November, 2023",
    rating: 5,
    review: "Fantastic experience! Highly recommend this branch.",
    image: "/assets/Ellipse 3.png",
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + 3 < reviews.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.title}>Customer Reviews</h2>
      <div className={styles.cardsContainer}>
        {reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.profile}>
              <img
                src={review.image}
                alt={`${review.name}'s profile`}
                className={styles.profileImage}
              />
              <div>
                <h4>{review.name}</h4>
                <p>{review.location}</p>
              </div>
            </div>
            <div className={styles.date}>
      
      <span className={styles.clockIcon}>
      <img src="/assets/Time Span.png" alt="Overall Rating" />
        
         </span> {review.date}
            </div>
            <p className={styles.reviewText}>{review.review}</p>
            <div className={styles.rating}>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </div>
      <img src="" alt="Overall Rating" className={styles.overallRating} />
      <div className={styles.controls}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={styles.navButton}
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + 3 >= reviews.length}
          className={styles.navButton}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Review;
