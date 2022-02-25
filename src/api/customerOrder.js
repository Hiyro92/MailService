const express = require("express");
const router = express.Router();
const Joi = require("joi");
const sendMail = require("../service/mailService");
const { addRowToSheet } = require("../service/sheetService");
const createMailContent = require("../template/ostern/mailTemplate");

const schema = Joi.object({
  lastname: Joi.string().min(3).max(40).required(),
  firstname: Joi.string().min(3).max(40).required(),
  email: Joi.string().min(3).max(50).required(),
  phonenumber: Joi.string().alphanum().required(),
  trout: Joi.number().integer().min(0).max(50).required(),
  salmon: Joi.number().integer().min(0).max(50).required(),
  comment: Joi.string().allow("").optional(),
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const data = await schema.validateAsync(req.body);
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
  return [
    data.lastname,
    data.firstname,
    data.email,
    data.phonenumber,
    data.member,
    data.trout,
    data.salmon,
    data.comment,
  ];
};

module.exports = router;
