const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactRouter = require("./routes/contactRoutes");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./.env" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.route("/").get((req, res) => {
  res.send("./index.html");
});

// sgMail.setApiKey(
//   process.env.SENDGRID_API_KEY
// );
// console.log(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: "mail@jordannlewis.com", // Change to your recipient
//   from: "mail@jordannlewis.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

app.use("/contact", contactRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
