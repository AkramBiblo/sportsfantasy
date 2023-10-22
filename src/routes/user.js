const express = require("express");
const user = express.Router();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { resolve } = require("path");
const e = require("express");
user.use(cookieParser());
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

user.get("/", (req, res) => {
  const getDBInfo = require("../../db");
  const con = getDBInfo.con;
  res.render("user", {
    title: "user",
  });
});



module.exports = user;
