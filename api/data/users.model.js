var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

  email:
  {
    type: String,
    unique: true,
    required: true
  },

  fname:
  {
    type: String,
    required: true
  },

  lname:
  {
    type: String,
    required: true
  },

  password:
  {
    type: String,
    required: true
  },

  img:
  {
    data: Buffer,
    contentType: String 
  }

});

mongoose.model('User', userSchema);
