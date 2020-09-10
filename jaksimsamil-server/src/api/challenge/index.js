const Router = require('koa-router');
const challenge = new Router();
const challengeCtrl = require('./challege.ctrl');

challenge.post("/getchallenge",challengeCtrl.getChallengePOST);
challenge.post("/addchallenge",challengeCtrl.addChallenge);
challenge.get("/list/:status",challengeCtrl.list);
challenge.post("/participate",challengeCtrl.participate);
challenge.get("/getchallenge",challengeCtrl.getChallengeGET);

module.exports = challenge;