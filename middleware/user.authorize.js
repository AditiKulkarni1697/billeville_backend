const express = require("express");
const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token, "middleware");
  //console.log(JSON.parse(token), "middleware");

  if (token) {

    jwt.verify(token, "bruce", async(err, decoded) => {
      console.log(decoded, "decoded", "middleware");
      const blacklisted = await BlacklistModel.findOne({token})
      if (decoded&&!blacklisted) {

        next();
      } 
      else if(blacklisted){
        res.status(401).send("Please login again")
      }
      else {
        console.log(err);
        res.status(401).send(err);
      }
    });
  } else {
    res.send("err middleware");
  }
};

module.exports = { auth };
