const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//LOAD MODELS

const Profile = require('../models/Profile');
const User = require('../models/User');

//LOAD VALIDATIONS

const validateProfileInput = require('../../validation/profile');


//@route GET /profile
//@desc display user profile
//@access Private

router.get('/', passport.authenticate('jwt', {session: false}), (req,res) => {
  Profile.findOne({user: req.user}, (err, data) => {
    if(err) throw(err);
    if(data) return res.json(data);
    res.json({fail: 'dail'})


  })
})

//@route GET /profile
//@desc display user profile
//@access Private

router.post('/', passport.authenticate('jwt', {session: false}), (req,res) =>{

  const { errors, isValid } = validateProfileInput(req.body);

  if(!isValid) return res.json({message: 'validation error', errors});

  //CREATE OR UPDATE PROFILE FIELDS
  const profileFields ={};

  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if(req.body.company) profileFields.company = req.body.company;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.bio) profileFields.bio = req.body.bio;

  //SKILLS SPLIT INTO ARRAY


  if(typeof req.body.skills != undefined) {
    profileFields.skills = req.body.skills.split(',');
  }

  profileFields.social = {};
  if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if(req.body.instagram) profileFields.social.instagram = req.body.instagram;


  Profile.findOne({user: req.user.id }, (err,profile) => {
    if (profile){
      //UPDATE
      Profile.findByIdAndUpdate(profile.id, {$set:{profileFields}}, {new:true}, (err,data) =>{
        res.json({message: 'updated', profile})
      })
    } else {
      //create
      Profile.find({handle: req.body.handle})
             .populate('user', ['name', 'avatar'])
             .then( user =>{
               if(user.length > 0) {
                 errors.handle = 'handle already exist'
                 res.status(400).json(errors)
               } else {
                 new Profile (profileFields).save((err, newProfile) =>{
                   res.status(201).json({message: 'New profile created',newProfile})
                 })
               }
             })
             .catch(err => res.status(400).json(err))
    }
  })
})




module.exports = router;
