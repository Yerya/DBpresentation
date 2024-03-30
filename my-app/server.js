const express = require("express");
const bodyParser = require("body-parser");
const Redis = require("ioredis");
const cors = require("cors");
const redis = new Redis(6379);

const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Массив для хранения отзывов
let reviews = [];

app.post("/review", async (req, res) => {
  const { name, review } = req.body;
  // Сохраняем отзыв в Redis
  await redis.rpush("reviews", JSON.stringify({ name, review }));
  // Добавляем отзыв в массив для быстрого доступа
  reviews.push({ name, review });
  res.json({ message: "Отзыв успешно сохранен" });
});

app.get("/reviews", async (req, res) => {
  // Получаем все отзывы из Redis
  const redisReviews = await redis.lrange("reviews", 0, -1);
  // Преобразуем данные из Redis в объекты JavaScript
  const parsedReviews = redisReviews.map((review) => JSON.parse(review));
  res.json(parsedReviews);
});

app.listen(3001, () => {
  console.log("Сервер запущен на порту 3001");
});
