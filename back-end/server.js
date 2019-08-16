const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport")
const userauth = require("./routes/api/userauth")
const users = require("./routes/api/users")
const app = express();
var cors = require("cors")

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors())
// DB Config
const db = require("./config/keys.js").mongoURI;
// Connect to MongoDB
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose
  .connect(
    db,
    { useNewUrlParser: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
// Passport config
require("./config/passport.js")(passport);
require("./config/passport")(passport);
//Routes
app.use("/api/userauth", userauth);
app.use("/api/user", users);
const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
