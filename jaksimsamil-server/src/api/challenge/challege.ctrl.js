const Challenge = require("../../models/challenge");
const Session = require("../../models/session");
const Participation = require("../../models/participation");
const Group = require("../../models/group");
const User = require("../../models/user");

const Joi = require("joi");
/*POST /api/challenge/getChallenge
{
    challengeName: "challengeName"
}
*/
exports.getChallenge = async (ctx) => {
  try {
    const { challengeName } = ctx.request.body;
    const challenge = await Challenge.findByChallengeName(challengeName).select(
      "-_id"
    );
    if (!challenge) {
      ctx.status = 401;
      return;
    }
    ctx.body = challenge;
  } catch (e) {
    ctx.throw(500, e);
  }
};
/*POST /api/challenge/addChallenge
{
    challengeName: "challengeName",
    startDate: Date Object,
    endDate: Date Object,
    durationPerSession: "2w", // '1d' means one day per session, '2w' means 2 weeks per session, '3m' means 3 months per session.
    goalPerSession: 3,
}
*/
exports.addChallenge = async (ctx) => {
  const schema = Joi.object()
    .keys({
      challengeName: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      durationPerSession: Joi.string(),
      goalPerSession: Joi.number(),
    })
    .unknown();
  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  let {
    challengeName,
    startDate,
    endDate,
    durationPerSession,
    goalPerSession,
  } = ctx.request.body;

  try {
    const isChallengeExist = await Challenge.findByChallengeName(
      challengeName
    ).select("-_id");

    if (isChallengeExist) {
      ctx.status = 409;
      return;
    }
    const challenge = new Challenge({
      challengeName,
      startDate,
      endDate,
      durationPerSession,
      goalPerSession,
    });

    await challenge.save();

    const newChallenge = await Challenge.findByChallengeName(challengeName);
    const newChallenge_id = newChallenge._id;
    const timeStep = Number(durationPerSession.slice(0, -1));
    if (typeof startDate == "string") {
      startDate = new Date(startDate);
    }
    if (typeof endDate == "string") {
      endDate = new Date(endDate);
    }
    for (let s_date = new Date(startDate); s_date < endDate; ) {
      let e_date = new Date(s_date);
      if (durationPerSession[durationPerSession.length - 1] === "d") {
        console.log("day");
        e_date.setDate(s_date.getDate() + timeStep);
      } else if (durationPerSession[durationPerSession.length - 1] === "w") {
        console.log("week");
        e_date.setDate(s_date.getDate() + timeStep * 7);
      } else if (durationPerSession[durationPerSession.length - 1] === "m") {
        console.log("month");
        e_date.setMonth(s_date.getMonth() + timeStep);
      }
      e_date.setMinutes(e_date.getMinutes() - 1);
      if (e_date > endDate) {
        break;
      }
      let status = "";
      if (s_date > new Date()) {
        status = "enrolled";
      } else if (s_date <= new Date() && new Date() <= e_date) {
        status = "progress";
      } else {
        status = "end";
      }
      console.log(`start:${s_date}\nend:${e_date}`);
      const session = new Session({
        challengeId: newChallenge_id,
        sessionStartDate: s_date,
        sessionEndDate: e_date,
        status: status,
      });
      await session.save();
      s_date = new Date(e_date);
      s_date.setMinutes(s_date.getMinutes() + 1);
    }
    ctx.body = challenge;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* GET /api/challenge/list?status
query string status can be in ['all','enrolled','progress','end']
*/
exports.list = async (ctx) => {
  try {
    const status = ctx.query.status;
    if (status !== "all") {
      const challenges = await Challenge.find({ status: status }).select(
        "-_id"
      );
      ctx.body = challenges;
    } else {
      const challenges = await Challenge.find({}).select("-_id");
      ctx.body = challenges;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

/* POST /api/challenge/participate
{
  username: 'username',
  challengeName: 'challengename'
}
*/

exports.participate = async (ctx) => {
  try {
    /*
  TODO: access token validation,
  recommend:get username from access_token
  */
    console.log(ctx.request.body);
    const { username, challengeName } = ctx.request.body;
    const challenge = await Challenge.findByChallengeName(challengeName);
    const challenge_id = challenge._id;
    const user = await User.findByUsername(username);
    const user_id = user._id;
    const newGroup = new Group({
      members: [user_id],
    });
    let newGroup_id = "";
    await newGroup.save(async (err, product) => {
      if (err) {
        throw err;
      }
      newGroup_id = product._id;
      const sessions = await Session.findByChallengeId(challenge_id);
      sessions.forEach(async (elem) => {
        const newParticipation = new Participation({
          sessionId: elem._id,
          groupId: newGroup_id,
          problems: [],
        });
        await newParticipation.save();
      });
    });
  } catch (e) {
    console.error(e);
    ctx.throw(500, e);
  }
};
