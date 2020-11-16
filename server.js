const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactRouter = require("./routes/contactRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require('cors');
const app = express();
dotenv.config({ path: "./.env" });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// // app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"],
//     styleSrc: ["'self'", "https://use.fontawesome.com/releases/v5.8.1/css/all.css"],
//     imgSrc: ["'self'", "i.imgur.com"]
//   }
// }))

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://cdnjs.cloudflare.com");
  console.log("middleware")
  return next();
})

app.route("/").get((req, res) => {
  console.log("going to the home page")
  res.status(200).sendFile("index.html");
});

app.route("/thank-you").get((req, res) => {
  res.sendFile("/thankyou.html", {
    root: path.join(__dirname, 'public')
  });
});

app.use("/contact", contactRouter);

app.route("*").get((req, res) => {
  console.log("error")
  res.sendFile("/error.html", {
    root: path.join(__dirname, 'public')
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
