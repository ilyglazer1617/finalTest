const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateLogIn } = require("../models/user");
//! לשנות!!

const authRouter = express.Router();
//! log in
authRouter.post("/", async (req, res) => {
  try {
    const { error } = validateLogIn(req.body);
    if (error) {
      res.status(401).send(error.details[0].message);
      return;
    }
    // userLogin(req.body);
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("username or password are wrong");

    let password = await bcrypt.compare(req.body.phoneNumber, user.phoneNumber);
    if (!password)
      return res.status(400).send("username or password are wrong");
    let token = user.generateJWT();
    res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = authRouter;
