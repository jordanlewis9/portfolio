const express = require("express");
const { sgMail, msg } = require('./../utils/emailSetup')

const router = express.Router();

router.post("/", async (req, res) => {
  if (!req.body.email || !req.body.subject || !req.body.message) {
    return res.status(400).json({
      status: 'fail',
      message: 'An email address, subject line, and message are required to post to this route.'
    })
  };
  const msgToSend = msg(req.body);
  try {
    await sgMail.send(msgToSend);
    res.status(200).json({
      status: 'success',
      message: 'Email successfully sent.'
    });
  } catch (error) {
    console.error(error)
  }
});

module.exports = router;
