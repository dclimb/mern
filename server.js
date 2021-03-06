const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const keys = require("./config/keys");

const app = express();
app.use(bodyParser.urlencoded({ estended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

// CONNECT TO THE DB

mongoose.connect(
  keys.MONGO_URI,
  { useNewUrlParser: true },
  error => {
    if (error) {
      return console.log("ERROR: not connected to the database" + error);
    } else {
      console.log("connected to the DB");
    }
  }
);

//ROUTES

const usersRoutes = require("./api/routes/users");
const profilesRoutes = require("./api/routes/profiles");
const postsRoutes = require("./api/routes/posts");

app.use("/users", usersRoutes);
app.use("/profiles", profilesRoutes);
app.use("/posts", postsRoutes);

// START SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("server working"));
