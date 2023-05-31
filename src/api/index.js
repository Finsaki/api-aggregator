const express = require("express");
const axios = require("axios");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");

router.get("/ping", (req, res) => {
  res.send({
    result: "pong",
  });
});

router.get("/weather-data/:city", (req, res) => {
  const { city } = req.params;
  return res.send(`Hello from ${city}`);
});

//test axios
router.get(
  "/axios-test",
  catchAsync(async (req, res, next) => {
    const { data: response } = await axios.get(
      "https://api.chucknorris.io/jokes/random"
    );
    return res.send(response.value);
  })
);

module.exports = router;
