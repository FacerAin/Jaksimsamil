const Router = require('koa-router');
const challenge = new Router();
const challengeCtrl = require('./challege.ctrl');

challenge.post("/getchallenge",challengeCtrl.getChallenge);
challenge.post("/addchallenge",challengeCtrl.addChallenge);
challenge.get("/list/:status",challengeCtrl.list);
challenge.post("/participate",challengeCtrl.participate);

module.exports = challenge;