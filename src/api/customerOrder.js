const express = require("express");
const router = express.Router();
const Joi = require("joi");
const sendMail = require("../service/mailService");
const { addRowToSheet } = require("../service/sheetService");

const schema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(40).required(),
  lastname: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phonenummer: Joi.string().alphanum().required(),
});

const mail = {
  subject: "Hello ✔",
  text: "TestText",
  html: "<b>Hello world?</b>",
};

router.post("/", async (req, res, next) => {
  try {
    const { firstname, lastname, email, phonenummer } =
      await schema.validateAsync(req.body);

    mail.to = email;
    mail.subject = `${firstname} ${lastname}`;
    const info = await sendMail(mail);
    res.send(info);
    console.log("Message sent: %s", info);
  } catch (err) {
    next(err);
  }
});

router.post("/test", async (req, res, next) => {
  try {
    console.log(req.body);
    const resonse = await addRowToSheet(req.body);
    console.log(resonse);
    res.send(resonse);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
