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

mongoose.connect("mongodb://localhost:27017/playlistDB", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const playlistSchema = new mongoose.Schema ({
  female: Number,
  male: Number
});

const Playlist = new mongoose.model("Playlist", playlistSchema);

// const females = [];
// const males = [];

function arrAve(arr){
  const ave = arr.reduce((a, b) => a + b, 0) / arr.length
  return ave
};

app.get("/", function(req, res){
  res.render("home");
});

app.get("/results", function(req, res){
  Playlist.find({}, function(err, foundPlaylist){
    if (foundPlaylist.length === 0){
      console.log("Empty");
      res.redirect("/")
    } else {
        res.render("results", {femaleRate: foundPlaylist.female, maleRate:foundPlaylist.male});
    }
  });

});

app.post("/", function(req, res){
  res.redirect("/");
});

app.post("/results", function(req, res){

  const female = req.body.femaleArtists;
  const male = req.body.maleArtists;

  const playlist = new Playlist ({
    female: female,
    male: male
  });

  playlist.save();
  res.redirect("/results");

  // females.push(female)
  // males.push(male)

});


app.listen(3000, function() {
  console.log("Server started successfully.");
})
