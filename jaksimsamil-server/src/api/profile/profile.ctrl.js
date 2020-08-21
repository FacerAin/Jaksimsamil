const User = require("../../models/user");
const mongoose = require("mongoose");
const getBJ = require("../../util/getBJ");
const Joi = require("joi");
const analyzeBJ = require("../../util/analyzeBJ");
const compareBJ = require("../../util/compareBJ");
const problem_set = require("../../data/problem_set");

const { ObjectId } = mongoose.Types;

exports.checkObjectId = (ctx, next) => {
  const { username } = ctx.request.body;
  if (!ObjectId.isValid(username)) {
    ctx.status = 400;
    return;
  }
  return next();
};

/*POST /api/profile/getprofile
{
  username: "username"
}
*/
exports.getProfile = async (ctx) => {
  try {
    const { username } = ctx.request.body;
    const profile = await User.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    ctx.body = profile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
POST /api/proflie/setprofile
{
    username: "username",
    userBJID: "userBJID",
    friendList: [String],
}
 */
exports.setProfile = async (ctx) => {
  const schema = Joi.object()
    .keys({
      username: Joi.string(),
      userBJID: Joi.string(),
      //freindList: Joi.array().items(Joi.string()),
    })
    .unknown();
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const profile = await User.findOneAndUpdate(
      { username: ctx.request.body.username },
      ctx.request.body,
      {
        new: true,
      }
    ).exec();

    if (!profile) {
      ctx.status = 404;
      return;
    }
    ctx.body = profile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
PATCH /api/proflie/syncBJ
{
    username: 'userid'
}
 */
exports.syncBJ = async function (ctx) {
  const { username } = ctx.request.body;

  if (!username) {
    ctx.status = 401;
    return;
  }

  try {
    const profile = await User.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    const BJID = await profile.getBJID();
    let BJdata = await getBJ.getBJ(BJID);
    let BJdata_date = await analyzeBJ.analyzeBJ(BJdata);
    const updateprofile = await User.findOneAndUpdate(
      { username: username },
      { solvedBJ: BJdata, solvedBJ_date: BJdata_date },
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
POST /api/proflie/recommend
{
    username: 'userid'
}
 */
exports.recommend = async (ctx) => {
  const { username } = ctx.request.body;

  if (!username) {
    ctx.status = 401;
    return;
  }
  try {
    const profile = await User.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    let unsolved_data = compareBJ.compareBJ(
      profile.getBJdata(),
      problem_set.problem_set
    );
    ctx.body = compareBJ.randomItem(unsolved_data);
    //TODO: 데이터가 비었을 떄 예외처리 필요
  } catch (e) {
    ctx.throw(500, e);
  }
};
