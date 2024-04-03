/**
 * emailService.js
 * @description :: exports function used in sending mails using nodemailer
 */

import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import constantsConfig from "../../common/config/constants.config";
import dotenv from "dotenv";
dotenv.config();

// const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const path = require("path");
// const { logo, baseUrl } = require("./common");

const sendMail = async (obj) => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  if (!Array.isArray(obj.to)) {
    obj.to = [obj.to];
  }

  const data = {
    ...obj.data,
    APP_NAME: process.env.APP_NAME,
    logo: constantsConfig.baseUrl("logo.png"),
  };

  const htmlText = await ejs.renderFile(
    path.join(`${__dirname}/../../../src/views/emailTemplate/index.ejs`),
    data
  );

  return await Promise.all(
    obj.to.map((emailId) => {
      let mailOpts = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: emailId,
        subject: obj.subject,
        html: htmlText,
      };
      transporter.sendMail(mailOpts, function (err, response) {
        if (err) {
          console.log(`Mail error : ${err}`);
        } else {
          console.log(`Mail sent : ${mailOpts.to}`);
        }
      });
    })
  );
};
module.exports = { sendMail };
