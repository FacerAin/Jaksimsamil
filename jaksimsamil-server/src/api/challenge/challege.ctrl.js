const Challenge = require("../../models/challenge");
const Joi = require("joi");
/*POST /api/challenge/getChallenge
{
    challengeName: "challengeName"
}
*/
exports.getChallenge = async (ctx) => {
  try {
    const { challengeName } = ctx.request.body;
    const challenge = await Challenge.findByChallengeName(challengeName);
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
      goalPerSession: Joi.number()
    })
    .unknown();
  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const {
    challengeName,
    startDate,
    endDate,
    durationPerSession,
    goalPerSession,
  } = ctx.request.body;

  try {
    const isChallengeExist = await Challenge.findByChallengeName(challengeName);

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
    ctx.body = challenge();
  } catch (e) {
    ctx.throw(500, e);
  }
  /*
  TODO: How to handle group?
  */
};
