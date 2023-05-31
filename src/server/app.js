const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const api_endpoints = require("../api");
const ExpressError = require("../utils/ExpressError");

const app = express();

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/", api_endpoints);

app.all("*", (req, res, next) => {
  next(new ExpressError("404 Path Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Sorry, Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});

module.exports = app;
