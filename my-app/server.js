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

app.post("/redis", async (req, res) => {
  const { key, value } = req.body;
  await redis.set(key, value);
  res.json({ message: "Успешно сохранено в Redis" });
});

app.listen(3001, () => {
  console.log("Сервер запущен на порту 3001");
});
