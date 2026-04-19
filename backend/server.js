import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const API_KEY = "b8865e5c07edf5e177980055ba93dd3f";

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
  );

  const data = await response.json();
  res.json(data);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});