const Router = require("koa-router");
const friend = new Router();

friend.post("/");
friend.delete("/:id");
friend.get("/:id");
friend.get("");

module.exports = friend;
