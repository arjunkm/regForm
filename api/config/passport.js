var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new localStrategy(
  {
    usernameField: 'email'
  },
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if(err){
        return done(err);
      }
      //User not found in db
      if(!user){
        return done(null, false, {message: 'User Not Found'});
      }
      //Credentials aren't correct
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Incorrect Password!'});
      }
        //User found, password correct
        return done(null, user);
    });
  })
);
