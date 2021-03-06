require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
require("./routes/html-api-routes")(app);
require("./routes/offer-api-routes")(app);
require("./routes/post-api-routes")(app);
require("./routes/user-api-routes")(app);

var syncOptions = { force: false };

// app.get("/userpage", function(req, res) {
//   res.render("userpage");
// });
// If running a test, set syncOptions.force to true
// clearing the `testdb`
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
