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
      if(vm.password !== vm.passwordRepeat){
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
        });
      }
    }
  }
};
