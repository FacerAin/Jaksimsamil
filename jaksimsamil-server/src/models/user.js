const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
  userBJID: String,
  sovledBJ: Object,
  solvedBJ_date: Object,
  friendList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  slackWebHookURL: String,
  goalNum: Number,
},{
  collection: 'user'
});

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.getBJID = function () {
  return this.userBJID;
};

UserSchema.methods.getBJdata = function () {
  return this.solvedBJ;
};

UserSchema.methods.getslackURL = function () {
  return this.slackWebHookURL;
};

UserSchema.methods.getgoalNum = function () {
  return this.goalNum;
};

UserSchema.methods.getTodaySovled = function () {
  if (this.solvedBJ_date) {
    return this.solvedBJ_date.presentNum;
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
