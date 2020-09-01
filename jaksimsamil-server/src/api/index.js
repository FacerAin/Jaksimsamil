const Router = require("koa-router");
const api = new Router();

const auth = require("./auth");
const friend = require("./friend");
const notify = require("./notify");
const user = require("./user");
const profile = require("./profile");
const challenge = require("./challenge");
const session = require("./session");

api.use("/auth", auth.routes());
api.use("/friend", friend.routes());
api.use("/notify", notify.routes());
api.use("/user", user.routes());
api.use("/profile", profile.routes());
api.use("/challenge",challenge.routes());
api.use("/session",session.routes());

module.exports = api;
