const express = require("express");
const router = express.Router();
const Joi = require("joi");
const sendMail = require("../service/mailService");

const schema = Joi.object({
  firstname: Joi.string().alphanum().min(3).max(40).required(),
  lastname: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phonenummer: Joi.string().alphanum().required(),
});

const mail = {
  from: '"Angelverein Althütte" asv@asv-althuette.de',
  to: "xxadrianxx@live.de",
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

module.exports = router;
