const Profile = require("../../models/profile");
const mongoose = require("mongoose");
const getBJ = require("../../util/getBJ");
const Joi = require("joi");

const { ObjectId } = mongoose.Types;

exports.checkObjectId = (ctx, next) => {
  const { username } = ctx.request.body;
  if (!ObjectId.isValid(username)) {
    ctx.status = 400;
    return;
  }
  return next();
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
    const profile = await Profile.findOneAndUpdate(
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
    const profile = await Profile.findByUsername(username);
    if (!profile) {
      ctx.status = 401;
      return;
    }
    const BJID = await profile.getBJID();
    let BJdata = await getBJ.getBJ(BJID);
    const updateprofile = await Profile.findOneAndUpdate(
      { username: username },
      { solvedBJ: BJdata },
      { new: true }
    ).exec();
    ctx.body = updateprofile;
  } catch (e) {
    ctx.throw(500, e);
  }
};
