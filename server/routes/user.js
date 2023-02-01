const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const { User, validate } = require("../models/user");

const router = express.Router();

//! register
router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already exsist ");

    user = new User(_.pick(req.body, ["username", "phoneNumber"]));
    const salt = await bcrypt.genSalt(10); //! saves the password with salted code
    user.phoneNumber = await bcrypt.hash(user.phoneNumber, salt);
    user = await user.save();
    res
      .header("x-auth-token", user.generateJWT())
      .header("access-control-expose-headers", "x-auth-token")
      .send(_.pick(user, ["username"]));
  } catch (err) {
    res.status(500).send("somethong went wrong");
  }
});
//! get user by phone number
router.get("/:phoneNumber", async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.params.phoneNumber });
  console.log(user);
  res.send(user);
});

module.exports = router;
