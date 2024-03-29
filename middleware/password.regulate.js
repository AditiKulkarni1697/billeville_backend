const express = require("express");

const passwordRegulate = (req, res, next) => {
  const { first_name, last_name, email_address, password, date_of_birth } =
    req.body;
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
  const confirm = regex.test(password);
  if (confirm) {
    next();
  } else {
    const err = new Error("Please input valid password")
    next(err)
  }
};

module.exports = { passwordRegulate };
