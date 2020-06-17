const Joi = require("joi");
const User = require("../../models/user");
const Profile = require("../../models/profile");
/*
POST /api/auth/register
{
    username: 'userid'
    password: 'userpassword'
}
*/
exports.register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const isNameExist = await User.findByUsername(username);
    if (isNameExist) {
      ctx.status = 409;
      return;
    }
    const profile = new Profile({
      username,
    });
    const user = new User({
      username,
    });
    await user.setPassword(password);
    await profile.save();
    await user.save();
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      //3일동안 유효
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
POST /api/auth/login
{
    username: 'userid'
    password: 'userpassword'
}
 */
exports.login = async (ctx) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.status = 401;
    return;
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      //7일동안 유효
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*
GET api/auth/check
*/
exports.check = async (ctx) => {
  console.log(ctx.state);
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};
/*
POST /api/auth/logout
*/
exports.logout = async (ctx) => {
  ctx.cookies.set("access_token");
  ctx.status = 204;
};
