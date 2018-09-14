var path = require("path");
// var db = require(path.join(__dirname, "../models"));
var publicPath = __dirname + "/../public/assets/views";

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"));
  });

  app.get("/saved", function (req, res) {
    res.sendFile(path.join(publicPath, "saved.html"));
  });
};