import React, { useEffect, useState } from "react";
import axios from "axios";
import RedisForm from "./Components/RedisForm.jsx";
import "./App.css";

function ReviewsList({ reviews }) {
  return (
    <div className="reviews">
      <h2>Отзывы:</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>{review.name}:</strong> {review.review}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3001/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Ошибка при получении отзывов:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReviewSubmit = () => {
    fetchReviews();
  };

  return (
    <div className="App">
      <RedisForm onReviewSubmit={handleReviewSubmit} />
      <ReviewsList reviews={reviews} />
    </div>
  );
}

export default App;
