const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProfileSchema = new Schema({
  username: { type: String, required: true, unique: true },
  userBJID: String,
  solvedBJ: Object,
  friendList: [String],
  slackWebHookURL: String,
});
ProfileSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};
ProfileSchema.methods.getBJID = function () {
  return this.userBJID;
};

ProfileSchema.methods.serialize = function () {
  const data = this.toJSON();
  return data;
};
const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
