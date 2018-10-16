const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require('passport');

const keys = require('./config/keys');

const app = express();
app.use(bodyParser.urlencoded({estended:false}));
app.use(bodyParser.json());



app.use(passport.initialize());
require('./config/passport')(passport);


// TEST ROUTE

app.get('/', (req, res, next)=>{
  res.send(keys.MONGO_URI)
})

// CONNECT TO THE DB

mongoose.connect(keys.MONGO_URI, {},(error) =>{
    if(error) {
      return console.log('ERROR: not connected to the database' + error)
  } else {
    console.log('connected to the DB')
  }
})





//ROUTES

const usersRoutes = require('./api/routes/users');
const profilesRoutes = require('./api/routes/profiles');
const postsRoutes = require('./api/routes/posts');

app.use('/users', usersRoutes)
app.use('/profiles', profilesRoutes)
app.use('/posts', postsRoutes)

// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('server working'));
