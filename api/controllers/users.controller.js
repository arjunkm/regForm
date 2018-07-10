var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');
var multer = require('multer');
var app = require('express');
var appExport = require('/Users/arjunkm/Desktop/bitlumeQuestion/app.js');

module.exports.register = function(req, res){

  // Expermental profile picture-upload code.
  // var storage = multer.diskStorage({
  //   destination : function(req, file, cb){
  //     cb(null, './web/') //set dest folder
  //   },
  //   filename: function(req, file, cb){
  //     var dateTimeStamp = Date.now();
          // rename to avoid problems wtih  duplicate files
  //     cb(null, file.fieldname + '-' + dateTimeStamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  //   }
  // });
  //
  // var upload = multer({
  //   storage: storage
  // }).single('file');


  // Create new user
  console.log("Registering Users");
  var email = req.body.email;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var password = req.body.password;

  User.create(
    {
      email: email,
      fname: fname,
      lname: lname,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function(err, user){
      if(err){
        console.log(err);
        res
          .status(400)
          .json(err);
      } else {
        appExport.upload(req, res, function (err) {
         if (err) {
            //return res.json(err);
            console.log(err);
         }
        //return res.end("File uploaded sucessfully!.");
        console.log("User created.");
        res
          .status(201)
          .json(user);
      });
    }
  });
}


// module.exports.login = function(req, res){
//   console.log("Log-in");
//   var email = req.body.email;
//   //var fname = req.body.fname;
//   //var lname = req.body.lname;
//   var password = req.body.password;
//
//   User.findOne(
//     {
//       email: email
//     }).exec(function(err, user){
//       if(err){
//         console.log(err);
//         res
//           .status(400)
//           .json(err);
//       }
//       else {
//             if(bcrypt.compareSync(password, user.password)){
//                 console.log("User found ", user);
//                 var token = jwt.sign({ email: user.email }, 's3cr3t', { expiresIn: 3600 });
//                   res
//                     .status(200)
//                     .json({success: true, token: token});
//             } else {
//               res
//                .status(401)
//                .json('Unauthorized');
//             }
//           }
//     });
// };
