var express = require('express');
var router = express.Router();

var ctrlUsers = require('../controllers/users.controller.js');

router
  .route('/register')
  .post(ctrlUsers.register);

module.exports = router;
