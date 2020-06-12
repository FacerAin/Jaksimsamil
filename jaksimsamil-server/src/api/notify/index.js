const Router = require("koa-router");
const notify = new Router();

notify.post("/slack");

module.exports = notify;
