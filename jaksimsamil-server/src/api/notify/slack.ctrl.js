const Profile = require("../../models/profile");
const sendSlack = require("../../util/sendSlack");
const problem_set = require("../../data/problem_set");
const compareBJ = require("../../util/compareBJ");
/*
POST api/notify/slack/goal
{
  username: "username"
}
*/
exports.slackGoal = async (ctx) => {
  try {
    const { username } = ctx.request.body;

    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let slackURL = profile.getslackURL();
    if (!slackURL) {
      ctx.status = 401;
      return;
    }
    let goalNum = profile.getgoalNum();
    let todayNum = profile.getTodaySovled();
    let message = "";
    if (goalNum < todayNum) {
      message =
        "오늘의 목표 " +
        goalNum +
        "문제 중 " +
        todayNum +
        "문제를 풀었습니다." +
        "\n" +
        "잘하셨습니다!";
    } else {
      message =
        "오늘의 목표 " +
        goalNum +
        "문제 중 " +
        todayNum +
        "문제를 풀었습니다." +
        "\n" +
        "분발하세요!";
    }

    sendSlack.send(message, slackURL);
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST api/notify/slack/recommend
{
  username: "username"
}
*/
exports.slackRecommend = async (ctx) => {
  try {
    console.log("1");
    const { username } = ctx.request.body;

    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let slackURL = profile.getslackURL();
    if (!slackURL) {
      ctx.status = 401;
      return;
    }
    let unsolved_data = compareBJ.compareBJ(
      profile.getBJdata(),
      problem_set.problem_set
    );
    let recommendData = compareBJ.randomItem(unsolved_data);

    if (!recommendData) {
      ctx.status = 401;
      return;
    }
    let message =
      "오늘의 추천 문제는 " +
      recommendData.problem_number +
      "번 " +
      " <https://www.boj.kr/" +
      recommendData.problem_number +
      "|" +
      recommendData.problem_title +
      ">" +
      " 입니다.";
    sendSlack.send(message, slackURL);
  } catch (e) {
    ctx.throw(500, e);
  }
};
