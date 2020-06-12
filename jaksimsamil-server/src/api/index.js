const Router = require("koa-router");
const api = new Router();

const auth = require("./auth");
const friend = require("./friend");
const notify = require("./profile");
const user = require("./user");
const profile = require("./profile");

api.use("/auth", auth.routes());
api.use("/friend", friend.routes());
api.use("/notify", notify.routes());
api.use("/user", user.routes());
api.use("/profile", profile.routes());

module.exports = api;
