const fs = require("fs");
const path = require("path");

const loadTemplateFile = () => {
  return fs.readFileSync(path.join(__dirname, "/mail.html"), {
    encoding: "utf8",
  });
};

let htmlMail = loadTemplateFile();

const createMailContent = (data) => {
  if (process.env.NODE_ENV === "development") htmlMail = loadTemplateFile();

  const mailContent = {
    from: process.env.MAIL_FROM,
    to: data.email,
    subject: "ASV-Forellenbestellung",
    html: htmlMail,
    attachments: [
      {
        filename: "Logo.png",
        path: "./src/template/static/Logo.png",
        cid: "logo",
      },
    ],
  };
  mailContent.html = mailContent.html
    .replace(/\$\[firstname\]/g, `${data.firstname}`)
    .replace(/\$\[lastname\]/g, `${data.lastname}`)
    .replace(/\$\[trout\]/g, `${data.trout}`)
    .replace(/\$\[salmon\]/g, `${data.salmon}`)
    .replace("./../static/Logo.png", `cid:logo`);
  return mailContent;
};

module.exports = createMailContent;
