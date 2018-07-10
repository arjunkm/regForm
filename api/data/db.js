var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/userData';

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app termination. (SIGINT)");
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app termination. (SIGTERM)");
    process.exit(0);
  });
});

process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected through app termination. (SIGUSR2)");
    process.kill(process.pid, 'SIGUSR2');
  });
});

require('./users.model');
