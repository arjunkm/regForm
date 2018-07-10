angular.module('login').controller('RegisterController', RegisterController);

function RegisterController($http){
  var vm = this;

  vm.register = function(){
    var user = {
      email: vm.email,
      fname: vm.fname,
      lname: vm.lname,
      password: vm.password
    };

    if(!vm.email || !vm.password){
      vm.error = 'Please enter an email and password.';
    } else {
      if(!vm.fname || !vm.lname){
        vm.error = 'Please enter First and last name.';
      }
      else if(vm.password !== vm.passwordRepeat){
        vm.error = 'Please enter matching passwords.';
      } else {
        console.log(user);
        $http.post('/api/register', user).then(function(result){
          console.log(result);
          console.log(user);
          vm.message = 'Successful login! Hello,' + ' ' + vm.fname + ' ' + vm.lname + '.';
          vm.error= '';
        }).catch(function(error){
          console.log(error);
          if(error.status === 400){
            vm.error = 'User with this e-mail ID already exists.';
          }
        });
      }
    }
  }
};



// angular.module('login',)
// .controller('RegisterController', ['Upload',function(Upload, $window, $http){
//
// //function RegisterController($http){
//   var vm = this;
//
//   vm.register = function(){
//
//     var user = {
//     email: vm.email,
//     fname: vm.fname,
//     lname: vm.lname,
//     password: vm.password
//   };
//
//   if(!vm.email || !vm.password){
//      vm.error = 'Please enter an email and password.';
//    } else {
//         if(vm.password !== vm.passwordRepeat){
//           vm.error = 'Please enter matching passwords.';
//         } else {
//           if(vm.registerForm.file.$valid && vm.file){
//             vm.upload(vm.file);
//           }
//           console.log(user);
//           $http.post('/api/register', user).then(function(result){
//             console.log(result);
//             console.log(user);
//             vm.message = 'Successful login! Hello,' + ' ' + vm.fname + ' ' + vm.lname + '.';
//             vm.error= '';
//           }).catch(function(error){
//               console.log(error);
//               if(error.status === 400){
//                 vm.error = 'User with this e-mail ID already exists.';
//               }
//           });
//       }
//    }
// }
//       vm.upload = function(file){
//         Upload.upload({
//           url: 'http://localhost:3000/#/register',
//           data: {file:file}
//         }).then(function(resp){
//           if(resp.data.error_code === 0){
//             $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
//           } else {
//             $window.alert('an error occured');
//           }
//         }, function(resp) { //catch error
//             console.log('Error status: ' + resp.status);
//             $window.alert('Error status: ' + resp.status);
//           });
//       };
// }]);

// var app = angular.module('login', ['ngFileUpload']);
//
// app.controller('RegisterController', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
//     $scope.uploadPic = function(file) {
//     file.upload = Upload.upload({
//       url: './web/',
//       data: {username: $scope.username, file: file},
//     });
//
//     file.upload.then(function (response) {
//       $timeout(function () {
//         file.result = response.data;
//       });
//     }, function (response) {
//       if (response.status > 0)
//         $scope.errorMsg = response.status + ': ' + response.data;
//     });
//     }
// }]);
