const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const api_endpoints = require("../api");
const ExpressError = require("../utils/ExpressError");
const { initDatabase } = require("../cache/cacheHelper");
const { DBFILEPATH } = require("../utils/config");

const app = express();

if (process.env.NODE_ENV !== "test") {
  try {
    initDatabase(DBFILEPATH);
  } catch (err) {
    console.error(err);
    console.error("Shutting down because there was an error in cache setup");
    process.exit(1);
  }
}

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/api/", api_endpoints);

app.all("*", (req, res, next) => {
  next(new ExpressError("404 Path Not Found", 404));
});

//Override Axios default 404 error
app.use((err, req, res, next) => {
  if (err.name === "AxiosError" && err.response.status === 404) {
    err = new ExpressError("404 Data Not Found", 404);
  }
  next(err);
});

//final error handler, use 500 as default if no error specified
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Sorry, Something Went Wrong" } = err;
  res.status(statusCode).send(message);
});

module.exports = app;
