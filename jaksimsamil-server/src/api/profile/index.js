const Router = require("koa-router");
const profile = new Router();

profile.post("/solved:id");
profile.get("/solvednum:id");
profile.get("recommendps:id");

module.exports = profile;
