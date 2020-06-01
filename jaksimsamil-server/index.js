const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();

app.use(
  morgan("[:date[iso]] :method :status :url :response-time(ms) :user-agent")
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", require("./api"));

app.listen(process.env.SERVER_PORT, () => {
  console.log("Server is running on port", process.env.SERVER_PORT);
});
