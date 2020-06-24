const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userBJID: String,
  solvedBJ: Object,
  solvedBJ_date: Object,
  friendList: [String],
  slackWebHookURL: String,
  goalNum: Number,
});
ProfileSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};
ProfileSchema.methods.getBJID = function () {
  return this.userBJID;
};
ProfileSchema.methods.getBJdata = function () {
  return this.solvedBJ;
};

ProfileSchema.methods.serialize = function () {
  const data = this.toJSON();
  return data;
};
const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
