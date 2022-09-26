const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("dotenv").config({ path: "./config.env" });
const dbUrl = process.env.ATLAS_URI;
const port = 3000;

const app = express();

// DB Setting
mongoose.connect(dbUrl);
const db = mongoose.connection;

db.once("open", function () {
  console.log("DB CONNECTED");
});

db.on("error", function (err) {
  console.log("ERROR : ", err);
});

//other Setting
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.use("/", require("./routes/home"));

// Port Setting
app.listen(port, function () {
  console.log("server on! http://localhost:" + port);
});
