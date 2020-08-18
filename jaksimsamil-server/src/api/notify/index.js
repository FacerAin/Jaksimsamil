const Router = require("koa-router");
const notify = new Router();
const slackCtrl = require("./slack.ctrl");
notify.post("/slack/goal", slackCtrl.slackGoal);
notify.post("/slack/recommend", slackCtrl.slackRecommend);

module.exports = notify;
