import React, { useState } from "react";
import axios from "axios";

function RedisForm({ onReviewSubmit }) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !review) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    try {
      await axios.post("http://localhost:3001/review", {
        name,
        review,
      });
      onReviewSubmit();
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Имя:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="review">Отзыв:</label>
        <input
          type="text"
          id="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button type="submit">Отправить отзыв</button>
    </form>
  );
}

export default RedisForm;
