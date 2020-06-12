const Router = require("koa-router");
const user = new Router();
user.post("/");
user.delete("/:id");
user.get("/:id");
user.get("");

module.exports = user;
