const Router = require('koa-router');
const session = new Router();
const sessionCtrl = require('./session.ctrl');

session.post("/createproblem/:how",sessionCtrl.createProblem);
session.get("/status",sessionCtrl.status);

module.exports = session;