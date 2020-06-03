const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const api = require("./src/api");
require("dotenv").config();
const { SERVER_PORT, MONGO_URL } = process.env;
app.use(
  morgan("[:date[iso]] :method :status :url :response-time(ms) :user-agent")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", api);
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(SERVER_PORT, () => {
  console.log("Server is running on port", process.env.SERVER_PORT);
});
