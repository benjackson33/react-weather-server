require("dotenv").config();
const express = require("express");

const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;
const API_KEY = process.env.OPENWEATHER_API_KEY;
app.use(express.json());
app.use(cors());

app.get("/:location", async (req, res) => {
  // res.send("hello")
  const location = req.params.location;
  //   console.log(location);
  const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`;
  //   console.log(apiUrl);

  try {
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    console.log(weatherData);
    res.json(weatherData);
  } catch (error) {
    res
      .status(error.response.status || 500)
      .json({ error: "Failed to fetch location" });
  }
});

let latitude;

app.get("/location/weather/:latitude/:longitude", async (req, res) => {
  // console.log(req.params.latitude);
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  //   console.log(longitude);
  //   console.log(latitude);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  // console.log(WEATHER_API_URL);
  try {
    const response = await axios.get(apiUrl);
    const currentWeather = response.data;
    console.log(currentWeather);
    res.json(currentWeather);
  } catch (error) {
    res
      .status(error.response.status || 500)
      .json({ error: "Failed to fetch location" });
  }
});

app.get("/forecast/:latitude/:longitude", async (req, res) => {
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  console.log(longitude);
  console.log(latitude);
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  console.log(apiUrl);

  try {
      const response = await axios.get(apiUrl);
      const forecast = response.data;
    //   console.log(forecast);
      res.json(forecast);
    } catch (error) {
      res
        .status(error.response.status || 500)
        .json({ error: "Failed to fetch location" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// http://api.openweathermap.org/geo/1.0/direct?q=london&limit=5&appid=c3606b4cb3e49273488081b7e1a65c2a
