const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");
auth.post("/login", authCtrl.login);
auth.get("/logout", authCtrl.logout);
auth.post("/register", authCtrl.register);

module.exports = auth;
