const express = require('express');
const router = express.Router();

//@route GET /posts
//@desc test route
//@access Public


router.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'get posts route successful'
  });
});

module.exports = router;
