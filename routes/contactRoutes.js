const express = require("express");
const path = require("path");
const { sgMail, msg } = require('./../utils/emailSetup')

const router = express.Router();

const handleEmailValidation = (email) => {
  const validRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return email.match(validRegex);
};

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.subject || !req.body.message) {
    return res.status(400).json({
      status: 'fail',
      message: 'An email address, subject line, and message are required to post to this route.'
    })
  };
  if (!handleEmailValidation(req.body.email)) {
    return res.status(400).json({
      status: 'fail',
      message: 'This is not a valid email address. Please enter a valid email address.'
    })
  };
  const msgToSend = msg(req.body);
  try {
    await sgMail.send(msgToSend);
    res.status(201).json({
      status: 'success',
      message: 'Email successfully sent.'
    })
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
