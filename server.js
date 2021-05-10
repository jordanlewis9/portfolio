const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactRouter = require("./routes/contactRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require('cors');
const rateLimit = require("express-rate-limit")
const app = express();
dotenv.config({ path: "./.env" });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "sha256-4ceKW4p347yM6DNp88zCxwCrtE/ORQ65LMuT492Osl4="],
    styleSrc: ["'self'", "https://use.fontawesome.com/releases/v5.8.1/css/all.css", "*.googleapis.com"],
    imgSrc: ["'self'", "i.imgur.com"],
    fontSrc: ["'self'", "*.fontawesome.com", "*.googleapis.com", "*.gstatic.com"]
  }
}));
app.set('trust proxy', 1);
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30
});

app.use(express.static(path.join(__dirname, "public")));

app.route("/").get((req, res) => {
  console.log("going to the home page")
  res.status(200).render("index.html");
});

app.use("/contact", contactLimiter, contactRouter);

app.route("/error").get((req, res) => {
  res.sendFile("/error.html", {
    root: path.join(__dirname, 'public')
  });
});

app.route("*").get((req, res) => {
  res.sendFile("/doesnotexist.html", {
    root: path.join(__dirname, 'public')
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
