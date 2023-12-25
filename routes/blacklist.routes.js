const express = require("express");
const { BlacklistModel } = require("../model/blacklist.model");
const blacklistRouter = express.Router();
const jwt = require("jsonwebtoken");


///////////////////////accessible to general user//////////////////////////////////////////////
blacklistRouter.get("/", async (req, res) => {
  //get userID of logged in person

  const token = req.headers.authorization;

  //const decoded = jwt.verify(token, "bruce");
  try {
    const token = await BlacklistModel.find({ token: token });
    res.status(200).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

blacklistRouter.get("/add", async (req, res) => {
  
  const token = req.headers.authorization;

  try {
    const token = new BlacklistModel({token:token});
    await token.save();
    res.status(200).send({ msg: "logged out" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = { blacklistRouter };
