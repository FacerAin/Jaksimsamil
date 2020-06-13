const Router = require("koa-router");
const profile = new Router();
const profileCtrl = require("./profile.ctrl");

profile.post("/solved:id");
profile.get("/solvednum:id");
profile.get("/recommendps:id");
profile.patch("/syncBJ", profileCtrl.syncBJ);
profile.post("/setprofile", profileCtrl.setProfile);
module.exports = profile;
