const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const contactRouter = require("./routes/contactRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.route("/").get((req, res) => {
  res.send("./index.html");
});

app.use("/contact", contactRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});
