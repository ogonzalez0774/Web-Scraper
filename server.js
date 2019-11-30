//System requirements
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

//Require the models
const db = require("./models");

//Set the port
const PORT = process.env.PORT || 3000;

//Initialize express
const express = require("express");
const app = express();

//logs using morgan
const logger = require("morgan");
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

//Set handlebars route
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
//Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Start server
app.listen(PORT, function() {
  console.log("News scraping app running on http://localhost:" + PORT);
});
