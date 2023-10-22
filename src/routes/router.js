const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const { resolve } = require("path");
const e = require("express");
router.use(cookieParser());
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/", (req, res) => {
  res.render("admin", {
    title: "admin",
  });
});

router.get("/features", (req, res) => {
  res.render("features", {
    title: "Features",
  });
});

router.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

router.post("/findSchedule", (req, res) => {
  const getDBInfo = require("../../db");
  const con = getDBInfo.con;
  
  let month = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let today = new Date()
  let todayDate = today.getDate() 
  let time = today.getTime()
  let d = req.body.SI;
  let date = new Date(d)
  let day = date.getDate()
  let t = date.getTime()
  let numaricMonth = date.getMonth() + 1;
  let m = month[date.getMonth()];
  let year = date.getFullYear();
  let weekDay = date.toLocaleString("en-us", { weekday: "long" });
  let manualDate = day + "-" + numaricMonth + "-" + year + ", ";
  if (day == todayDate) {
    let sql = `SELECT * FROM ${m} WHERE id = ${day}`;
    con.query(sql, (err, result) => {
      let message = [result[0], manualDate, weekDay, day, m];
      res.send(message);
    });
  } else {
     if (t < time) {
       res.send("Back dated schedule can not be booked!");
     } else {
       let sql = `SELECT * FROM ${m} WHERE id = ${day}`;
       con.query(sql, (err, result) => {
         let message = [result[0], manualDate, weekDay, day, m];
         res.send(message);
       });
     }
  }
  
});

router.post("/bookSchedule", (req, res) => {
  let id = req.body.day;
  let month = req.body.month;
  let name = req.body.name;
  let mobile = req.body.mobile;
  let timeSchedule = req.body.timeSchedule;
  timeSchedule--
  
  let columnArray = [`_5amto6am`, `_6amto7am`, `_7amto8am`, `_8amto9am`, `_9amto10am`, `_10amto11am`, `_11amto12pm`, `_12pmto1pm`, `_1pmto2pm`, `_2pmto3pm`, `_3pmto4pm`, `_4pmto5pm`, `_5pmto6pm`, `_6pmto7pm`, `_7pmto8pm`, `_8pmto9pm`, `_9pmto10pm`, `_10pmto11pm`, `_11pmto12am`, `_12amto1am`, `_1amto2am`, `_2amto3am`, `_3amto4am`, `_4amto5am`];

  let column = columnArray[timeSchedule];
  const getDBInfo = require("../../db");
  const con = getDBInfo.con;
  let sql = `UPDATE ${month} SET ${column} = "${name}, ${mobile}" WHERE id = ${id}`;
  con.query(sql, (err, result) => {
    res.render("user", {
      title: "Schedule",
      successMsg: "Schedule booked successfully!",
    });
  });
});

router.post("/adminBookSchedule", (req, res) => {
  let id = req.body.day;
  let month = req.body.month;
  let name = req.body.name;
  let mobile = req.body.mobile;
  let timeSchedule = req.body.timeSchedule;
  timeSchedule--;

  let columnArray = [
    `_5amto6am`,
    `_6amto7am`,
    `_7amto8am`,
    `_8amto9am`,
    `_9amto10am`,
    `_10amto11am`,
    `_11amto12pm`,
    `_12pmto1pm`,
    `_1pmto2pm`,
    `_2pmto3pm`,
    `_3pmto4pm`,
    `_4pmto5pm`,
    `_5pmto6pm`,
    `_6pmto7pm`,
    `_7pmto8pm`,
    `_8pmto9pm`,
    `_9pmto10pm`,
    `_10pmto11pm`,
    `_11pmto12am`,
    `_12amto1am`,
    `_1amto2am`,
    `_2amto3am`,
    `_3amto4am`,
    `_4amto5am`,
  ];

  let column = columnArray[timeSchedule];
  const getDBInfo = require("../../db");
  const con = getDBInfo.con;
  let sql = `UPDATE ${month} SET ${column} = "${name}, ${mobile}" WHERE id = ${id}`;
  con.query(sql, (err, result) => {
    res.render("admin", {
      title: "Schedule",
      successMsg: "Schedule booked successfully!",
    });
  });
});

router.post("/cancelBooking", (req, res) => {
  let id = req.body.day;
  let month = req.body.month;
  let name = req.body.name;
  let mobile = req.body.mobile;
  let timeSchedule = req.body.timeSchedule;
  timeSchedule--;

  let columnArray = [
    `_5amto6am`,
    `_6amto7am`,
    `_7amto8am`,
    `_8amto9am`,
    `_9amto10am`,
    `_10amto11am`,
    `_11amto12pm`,
    `_12pmto1pm`,
    `_1pmto2pm`,
    `_2pmto3pm`,
    `_3pmto4pm`,
    `_4pmto5pm`,
    `_5pmto6pm`,
    `_6pmto7pm`,
    `_7pmto8pm`,
    `_8pmto9pm`,
    `_9pmto10pm`,
    `_10pmto11pm`,
    `_11pmto12am`,
    `_12amto1am`,
    `_1amto2am`,
    `_2amto3am`,
    `_3amto4am`,
    `_4amto5am`,
  ];

  let column = columnArray[timeSchedule];
  const getDBInfo = require("../../db");
  const con = getDBInfo.con;
  let sql = `UPDATE ${month} SET ${column} = "" WHERE id = ${id}`;
  con.query(sql, (err, result) => {
    res.render("admin", {
      title: "Schedule",
      successMsg: "Schedule cancelled successfully!",
    });
  });
});


module.exports = router;
