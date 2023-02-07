const express = require("express");
const router = express.Router();
const Joi = require("joi");
const sendMail = require("../service/mailService");
const { addRowToSheet } = require("../service/sheetService");
const createMailContent = require("../template/ostern/mailTemplate");
const moment = require("moment");
const UAParser = require("ua-parser-js");

const schema = Joi.object({
  lastname: Joi.string().min(3).max(40).required(),
  firstname: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().min(3).max(50).required(),
  phonenumber: Joi.string().alphanum().required(),
  trout: Joi.number().integer().min(0).max(50).required(),
  salmon: Joi.number().integer().min(0).max(50).required(),
  comment: Joi.string().allow("").optional(),
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  let parser = new UAParser(req.headers["user-agent"]);
  try {
    const data = await schema.validateAsync(req.body);
    data.member = "Online";
    data.device = parser.getDevice().type ? parser.getDevice().type : "desktop";
    data.os = parser.getOS().name;
    const [sheetRes, mailRes] = await Promise.all([
      addRowToSheet(createSheetArray(data)),
      sendMail(createMailContent(data)),
    ]);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

const createSheetArray = (data) => {
  moment.locale("de");
  return [
    moment().format("LLLL"),
    data.lastname,
    data.firstname,
    data.email,
    data.phonenumber,
    data.member,
    data.trout,
    data.salmon,
    data.comment,
    data.device,
    data.os,
  ];
};

module.exports = router;
