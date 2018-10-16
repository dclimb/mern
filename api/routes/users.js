const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//REQUIRE VALIDATORS

const validateSigninInput = require('../../validation/signin')
const validateLoginInput = require('../../validation/login')




//@route GET /users
//@desc test route
//@access Public


router.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'get users route successful'
  });
});




//@route POST /users/signin
//@desc sign in
//@access Public

router.post('/signin', (req,res,next) => {
  const {errors, isValid} = validateSigninInput(req.body);

  if(!isValid){
    return res.status(400).json(errors)
  };

  User.find({email: req.body.email}, (err, data) =>{
    if (data.length > 0){
      errors.email = 'This email already exists';
      res.status(400).json(errors)
    } else {
      bcrypt.hash(req.body.password, 10, (err,hash) =>{
        if (err) {
          res.status(500).json({
            message: 'User not created',
            error: err
          })
        } else {
          const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              avatar: req.body.avatar,
          });

          user.save((err, newUser) => {
              if(err){
                res.status(500).json({
                  message: 'failed to sign in',
                  error: err
                })
              } else{
                res.status(201).json(newUser)
              }
          })
        }
      })
    }

  });
});


//@route POST /users/login
//@desc log in
//@access Public

router.post('/login', (req,res,next) => {

  const {errors, isValid} = validateLoginInput(req.body);

  if(!isValid) return res.status(400).json(errors);

  User.findOne({email: req.body.email}, (err, user) =>{
    if(user == null){
      errors.email = 'Email not found';
      res.status(500).json(errors);
    } else {
      // return res.json(user)
      bcrypt.compare(req.body.password, user.password, (err, data) =>{
        if (!data) {
          errors.password = 'Incorrect password';
          res.status(401).json(errors);
        } else {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          }
          jwt.sign(
            payload,
            keys.PASSPORT_KEY,
            {expiresIn:'1h'},
            (err, token) =>{
              if (err) { throw(err)};
              res.status(200).json({
                message: 'success',
                token: 'Bearer ' + token
            })
          })
        }
      })
    }
  })
})

//@route get /users/current
//@desc return current user
//@access Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) =>{
  res.json(req.user)
})
module.exports = router;
