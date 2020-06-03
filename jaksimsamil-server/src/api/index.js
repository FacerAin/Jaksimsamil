const express = require("express");
const app = express();

const auth = require("./auth");
const friend = require("./friend");
const notify = require("./profile");
const user = require("./user");
const profile = require("./profile");

app.use("/auth", auth);
app.use("/friend", friend);
app.use("/notify", notify);
app.use("/user", user);
app.use("/profile", profile);

module.exports = app;
