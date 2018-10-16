const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');






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
  User.find({email: req.body.email}, (err, data) =>{
    if (data.length > 0){
      res.json({
        message: 'This email already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err,hash) =>{
        if (err) {
          res.status(500).json({
            message: 'User nor created',
            error: err
          })
        } else {
          const user = new User({
              name: req.body.name,
              email: req.body.email,
              password: hash,
              avatar: req.body.avatar,
          });

          user.save((err, data) => {
              if(err){
                res.status(500).json({
                  message: 'failed to sign in',
                  error: err
                })
              } else{
                res.status(201).json(data)
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
  User.findOne({email: req.body.email}, (err, user) =>{
    if(user == null){
      res.status(500).json({message: 'Email not found'})
    } else {
      // return res.json(user)
      bcrypt.compare(req.body.password, user.password, (err, data) =>{
        if (!data) {
          res.status(401).json({message: 'Incorrect password'})
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
