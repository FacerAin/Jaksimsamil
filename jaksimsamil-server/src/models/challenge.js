const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChallengeSchema = new Schema(
  {
    challengeName: { type: String, required: true },
    startDate: { type: Object, required: true },
    endDate: { type: Object, required: true },
    durationPerSession: { type: String, required: true }, // '1d' means one day per session, '2w' means 2 weeks per session, '3m' means 3 months per session.
    goalPerSession: { type: Number, required: true }, // number of problems for one session
    isOpen: { type: Boolean },
  },
  {
    collection: "challenge",
  }
);

ChallengeSchema.statics.findByChallengeName = function (challengeName) {
  return this.findOne({ challengeName: challengeName });
};

ChallengeSchema.methods.getChallengeName = function () {
  return this.challengeName;
};

ChallengeSchema.methods.getStartDate = function () {
  return this.startDate;
};

ChallengeSchema.methods.getEndDate = function () {
  return this.endDate;
};

ChallengeSchema.methods.getDurationPerSession = function () {
  return this.durationPerSession;
};

ChallengeSchema.methods.getGoalPerSession = function () {
  return this.goalPerSession;
};

ChallengeSchema.methods.serialize = function () {
  return this.toJSON();
};

const Challenge = mongoose.model("Challenge", ChallengeSchema);
module.exports = Challenge;
