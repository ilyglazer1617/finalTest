const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 20,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    max: 10,
    min: 7,
    unique: true,
  },
});
UserSchema.methods.generateJWT = function () {
  const token = jwt.sign({ phoneNumber: this.phoneNumber }, "thisString");
  return token;
};

const User = new mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(7).max(10).required(),
  };

  return Joi.validate(user, UserSchema);
}
function validateLogIn(userlog) {
  const schema1 = {
    username: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(7).max(10).required(),
  };

  return Joi.validate(userlog, schema1);
}

module.exports.validate = validateUser;
module.exports.User = User;
module.exports.validateLogIn = validateLogIn;
