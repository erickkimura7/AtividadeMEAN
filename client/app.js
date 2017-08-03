var myApp = angular.module('myApp', ['ngRoute','ngResource']);

myApp.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider
  .when('/',{
    templateUrl: 'pages/main.html',
//    controller: 'mainController'
      access: {restricted: false}
  })
  .when('/login', {
      access: {restricted: false},
      templateUrl: 'pages/login.html',
      controller: 'loginController'
    })
    .when('/loginredir', {
      access: {restricted: false},
      templateUrl: 'pages/loginredir.html',
      controller: 'loginController'
    })
   .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
   .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
   .when('/contatos',{
    access: {restricted: true},
    templateUrl: 'pages/contatos.html',
    controller: 'ContactsCtrl'
   })
   .when('/sobre',{
    templateUrl: 'pages/sobre.html',
//    controller: 'mainController',
      access: {restricted: false}
  })

});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        $rootScope.loading='';
        if(!AuthService.isLoggedIn()){
            $rootScope.logado='true';
            $rootScope.deslogado='';
        }else{
            $rootScope.logado='';
            $rootScope.deslogado='true';
        }
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/loginredir');
          $route.reload();
        }
        $rootScope.loading='true';
      });
  });
});


