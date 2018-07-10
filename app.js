require('./api/data/db.js');

var express = require('express');
var app = express();
var path = require('path');
var multiparty = require('connect-multiparty');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var bcrypt = require('bcrypt');
var multer = require('multer');
var mongoose = require('mongoose');
var User = mongoose.model('User');


app.set('port',3000); //Defining port

app.use(function(req, res, next){
  console.log(req.method, req.url);
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(express.static(path.join(__dirname, 'public'))); // Delivering static files from public folder
app.use('/node_modules', express.static(__dirname+'/node_modules'));
app.use(bodyParser.json());

app.use('/api',routes);

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./web/");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});

module.exports.upload = multer({ storage: Storage }).single('file');

//

// app.post('/register', function (req, res) {
//
//   console.log("Registering Users");
//   var email = req.body.email;
//   var fname = req.body.fname;
//   var lname = req.body.lname;
//   var password = req.body.password;
//
//   User.create(
//     {
//       email: email,
//       fname: fname,
//       lname: lname,
//       password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//     }, function (err, user) {
//       if (err) {
//         console.log(err);
//         res
//           .status(400)
//           .json(err);
//       } else {
//         upload(req, res, function (err) {
//           if (err) {
//             return res.end("Something went wrong!");
//           }
//           return res.end("File uploaded sucessfully!.");
//           res
//             .status(201)
//             .json(user);
//           console.log("User created", user);
//
//         });
//     }
//   }
//
// );
// });

//Setting the port to listen to requests
var server = app.listen(app.get('port'), function(){
  var port = server.address().port; //Extract port number fromserver object
  console.log("App running. Port number - " + port);
});
