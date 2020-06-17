const Router = require("koa-router");
const auth = new Router();
const authCtrl = require("./auth.ctrl");
auth.post("/login", authCtrl.login);
auth.post("/logout", authCtrl.logout);
auth.post("/register", authCtrl.register);
auth.get("/check", authCtrl.check);

module.exports = auth;
