const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//LOAD MODELS

const Profile = require("../models/Profile");
const User = require("../models/User");

//LOAD VALIDATIONS

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//@route GET /profiles
//@desc display user profile
//@access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user })
      .populate("user", "name avatar")
      .then(profile => {
        if (!profile) return res.status(404).json(errors);
        res.status(200).json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET /profiles/handle/:handle
//@desc get user profile by handle params
//@access Public

router.get("/handle/:handle", (req, res) => {
  var errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user")
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => {
      errors.profile = "Profile not found";
      res.status(404).json(errors);
    });
});

//@route GET /profiles/user/:userId
//@desc get user profile by userId params
//@access Public

router.get("/user/:userId", (req, res) => {
  var errors = {};
  Profile.findOne({ user: req.params.userId })
    .populate("user")
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => {
      errors.profile = "Profile not found";
      res.status(404).json(errors);
    });
});

//@route GET profiles/all
//@desc get all profiles
//@access Public

router.get("/all", (req, res) => {
  var errors = {};
  Profile.find()
    .populate("user", "name")
    .then(profile => {
      res.status(200).json(profile);
    })
    .catch(err => {
      errors.profile = "There are no profiles";
      res.status(404).json(errors);
    });
});

//@route POST /profile
//@desc create and update profile
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
//@route POST /profiles/experience
//@desc create and update experience
//@access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let experienceFields = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description,
          current: req.body.current
        };

        profile.experience.unshift(experienceFields);
        profile.save((err, data) => {
          if (err) return res.status(400).json(err);
          res.status(201).json(profile);
        });
      })
      .catch(err => res.status(400).json(err));
  }
);

//@route POST /profiles/education
//@desc create and update education
//@access Private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        let educationFields = {
          school: req.body.school,
          degree: req.body.degree,
          fieldOfEducation: req.body.fieldOfEducation,
          from: req.body.from,
          to: req.body.to,
          description: req.body.description,
          current: req.body.current
        };

        profile.education.unshift(educationFields);
        profile.save((err, data) => {
          if (err) return res.status(400).json(err);
          res.status(201).json(profile);
        });
      })
      .catch(err => res.json(err));
  }
);

//@route DELETE /profiles/experience
//@desc delete experience
//@access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      //res.json(profile.experience)
      const findIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);
      profile.experience.splice(findIndex, 1);
      profile.save((err, data) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(data);
      });
    });
  }
);

//@route DELETE /profiles/education
//@desc delete education
//@access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }, (err, profile) => {
      //res.json(profile.education)
      const findIndex = profile.education
        .map(item => item.education)
        .indexOf(req.params.exp_id);
      profile.education.splice(findIndex, 1);
      profile.save((err, data) => {
        if (err) return res.status(400).json(err);
        res.status(200).json({ message: "deleted", data });
      });
    });
  }
);

//@route DELETE /profiles
//@desc delete user and profile
//@access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }, (err, profile) => {
      if (err) return res.json(err);
      User.findOneAndRemove({ _id: req.user.id }, (err, user) => {
        if (err) return res.json(err);
        res.status(200).json({ message: "deleted" });
      });
    });
  }
);

module.exports = router;
