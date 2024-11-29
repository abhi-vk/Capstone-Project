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
  const [isMobile, setIsMobile] = useState(false);

  // Responsive handling
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.title}>
        <div>Customer Reviews</div>
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
            disabled={currentIndex === reviews.length - 1}
            className={styles.navButton}
          >
            &#10095;
          </button>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {isMobile ? (
          // Show one review at a time for mobile
          <div className={styles.card}>
            <div className={styles.profile}>
              <img
                src={reviews[currentIndex].image}
                alt={`${reviews[currentIndex].name}'s profile`}
                className={styles.profileImage}
              />
              <div className={styles.orangeLine}></div>
              <div className={styles.profileDetails}>
                <h4 className={styles.name}>{reviews[currentIndex].name}</h4>
                <p className={styles.location}>
                  {reviews[currentIndex].location}
                </p>
              </div>
            </div>
            <div className={styles.date}>
              <span className={styles.clockIcon}>🕒</span>{" "}
              {reviews[currentIndex].date}
            </div>
            <p className={styles.reviewText}>
              {reviews[currentIndex].review}
            </p>
            <div className={styles.rating}>
              {"★".repeat(reviews[currentIndex].rating)}
              {"☆".repeat(5 - reviews[currentIndex].rating)}
            </div>
          </div>
        ) : (
          // Show three reviews for larger screens
          reviews.slice(currentIndex, currentIndex + 3).map((review, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.profile}>
                <img
                  src={review.image}
                  alt={`${review.name}'s profile`}
                  className={styles.profileImage}
                />
                <div className={styles.orangeLine}></div>
                <div className={styles.profileDetails}>
                  <h4 className={styles.name}>{review.name}</h4>
                  <p className={styles.location}>{review.location}</p>
                </div>
              </div>
              <div className={styles.date}>
                <span className={styles.clockIcon}>🕒</span> {review.date}
              </div>
              <p className={styles.reviewText}>{review.review}</p>
              <div className={styles.rating}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.overallRatingContainer}>
  <div className={styles.overallRating}>
    <span className={styles.ratingValue}>3.4</span>
    <div className={styles.rating}>
      {"★".repeat(3)}
      {"☆".repeat(2)}
    </div>
    <span className={styles.totalReviews}>1,360 reviews</span>
  </div>
</div>
    </div>
  );
};

export default Review;
