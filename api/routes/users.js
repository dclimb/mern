const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//REQUIRE VALIDATORS

const validateSigninInput = require("../../validation/signin");
const validateLoginInput = require("../../validation/login");

//@route GET /users
//@desc test route
//@access Public

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "get users route successful"
  });
});

//@route POST /users/signin
//@desc sign in
//@access Public

router.post("/signin", (req, res, next) => {
  const { errors, isValid } = validateSigninInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //CHECK IF EMAIL ALREADY EXISTS

  User.find({ email: req.body.email }, (err, data) => {
    if (data.length > 0) {
      errors.email = "This email already exists";
      res.status(400).json(errors);
    } else {
      //ENCRIPT PASSWORD
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(500).json({
            message: "User not created",
            error: err
          });
        } else {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            avatar: req.body.avatar
          });

          user.save((err, newUser) => {
            if (err) {
              res.status(500).json({
                message: "failed to sign in",
                error: err
              });
            } else {
              res.status(201).json(newUser);
            }
          });
        }
      });
    }
  });
});

//@route POST /users/login
//@desc log in
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.PASSPORT_KEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route get /users/current
//@desc return current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);
module.exports = router;
