import React, { useState } from "react";
import axios from "axios";

function RedisForm() {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/redis", {
        key,
        value,
      });
      console.log(response.data); // Ответ от сервера Redis
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="key">Ключ:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="value">Значение:</label>
        <input
          type="text"
          id="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button type="submit">Отправить</button>
    </form>
  );
}

export default RedisForm;
