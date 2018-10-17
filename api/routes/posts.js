const express = require('express');
const router = express.Router();
const passport = require('passport');

//REQUIRE MODELS
const Post = require('../models/Post');

//REQUIRE VALIDATIONS
const validatePostInput = require('../../validation/postValidation');

//@route GET /posts
//@desc test route
//@access Public


router.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'get posts route successful'
  });
});



//@route  -  GET /posts
//@desc   -  get all the posts
//@access -  Public


router.get('/all', (req,res,next) => {
  Post.find()
      .populate('user')
      .sort({date: -1})
      .then( post => {
        res.status(200).json(post)
      })
      .catch(err => res.status(404).json(err))
});





//@route  -  GET /posts/:id
//@desc   -  get post by :id parameter
//@access -  Public


router.get('/:postId', (req,res,next) => {
  Post.findById(req.params.postId)
      .then( post => {
        res.status(200).json(post)
      })
      .catch(err => res.status(404).json(err))
});




//@route  - POST /posts
//@desc   - create a post
//@access - Private


router.post('/', passport.authenticate('jwt', {session: false}), (req,res,next) => {
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      user: req.user.id,
      name: req.body.name,
      avatar: req.body.avatar,
      text: req.body.text,
    });

    newPost.save((err, data) =>{
      if(err) return res.status(400).json(err);
      res.status(201).json(data)
    })
});






//@route  -  POST /posts/like/:id
//@desc   -  like post by :postId parameter
//@access -  Private


router.post('/like/:postId', passport.authenticate('jwt', {session: false}), (req,res,next) => {

  Post.findById(req.params.postId)
      .then( post => {
        if(post.likes.indexOf(req.user.id) >= 0){
          res.json({message: 'You already liked this post', post})
        } else {
          post.likes.push( req.user.id);
          post.save((err, likes) =>{
            if(err) res.status(400).json(err);
            res.json({message: 'You like this post'})
          })
        }
      })
      .catch(err => res.status(404).json(err))
});






//@route  -  POST /posts/unlike/:id
//@desc   -  unlike post by :postId parameter
//@access -  Private


router.post('/unlike/:postId', passport.authenticate('jwt', {session: false}), (req,res,next) => {

  Post.findById(req.params.postId)
      .then( post => {
        if(post.likes.indexOf(req.user.id) >= 0){
          const likeIndex = post.likes.indexOf(req.user.id);
          post.likes.splice(likeIndex,1);

          post.save((err, likes) =>{
            if(err) res.status(400).json(err);
            res.json({message: 'You unliked this post', post})
          })
        } else {
          res.json({message: 'You have not yet liked this post', post})
        }
      })
      .catch(err => res.status(404).json({error: 'why'}))
});




//@route  -  DELETE /posts/:id
//@desc   -  delete post by :postId parameter
//@access -  Private


router.delete('/:postId', passport.authenticate('jwt', {session: false}), (req,res,next) => {
  Post.findById(req.params.postId)
      .then( post => {
        if( req.user.id.toString() != post.user) {
          return res.status(401).json({error: 'Not authorized'})
        }
          post.remove((err, removed) =>{
            if(err) return res.status(400).json(err);
            res.status(200).json({message: 'Post removed'})
          })
      })
      .catch(err => res.status(404).json({error: 'not found'}))
});




module.exports = router;
