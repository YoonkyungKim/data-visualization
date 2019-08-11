//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
// *** to use req.body.--
app.use(bodyParser.urlencoded({extended: true}));
// *** to link other files ex:css
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const females = [];
const males = [];

function arrAve(arr){
  const ave = arr.reduce((a, b) => a + b, 0) / arr.length
  return ave
};

app.get("/", function(req, res){
  res.render("home");
});

app.get("/results", function(req, res){
  res.render("results", {femaleRate: females, maleRate: males});
});

app.post("/", function(req, res){
  res.redirect("/");
});

app.post("/results", function(req, res){
  const female = req.body.femaleArtists;
  const male = req.body.maleArtists;

  females.push(female)
  males.push(male)

  res.redirect("/results");

})


app.listen(3000, function() {
  console.log("Server started successfully.");
})
