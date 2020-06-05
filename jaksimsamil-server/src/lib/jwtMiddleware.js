const jwt = require("jsonwebtoken");
const User = require("../models/user");
const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) {
    //토큰이 없을 때
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    //토큰의 남은 유효 기간이 2일 이하라면 재발급
    if (decoded.exp - Date.now() / 1000 < 60 * 60 * 24 * 2) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = jwtMiddleware;
