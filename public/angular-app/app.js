angular.module('login', ['ngRoute']).config(config);

function config($routeProvider){
  $routeProvider
    .when('/register', {
      templateUrl: '/angular-app/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
  })
    .otherwise({
      redirectTo: '/register'
    });
}
