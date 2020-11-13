// const nodemailer = require('nodemailer');
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path")
dotenv.config({ path: path.resolve(__dirname, '../.env') });

sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

const msg = (contactInfo) => {
  return ({
    to: process.env.EMAIL,
    from: process.env.EMAIL,
    subject: contactInfo.subject,
    text: contactInfo.message,
    html: `<p>From: ${contactInfo.email}</p> <br> <p>Name: ${contactInfo.name || "No name given"}</p> <br> <p>Message: ${contactInfo.message}</p>`
  });
} 
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = {sgMail, msg}