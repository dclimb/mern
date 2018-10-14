const express = require('express');
const router = express.Router();

//@route GET /users
//@desc test route
//@access Public


router.get('/', (req,res,next) => {
  res.status(200).json({
    message: 'get users route successful'
  });
});

module.exports = router;
