angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);
angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);


angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope,$location, AuthService) {
    $scope.register = function () {
      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Algo deu errado. Tente novamente mais tarde.";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
angular.module('myApp').controller('ContactsCtrl',['$rootScope','$scope','$log','$http', function($rootScope,$scope,$log,$http) {
  if($rootScope.logado==''){
    $http.get('/user/contato').success(function(data){
    $scope.contacts = data;
  }).error(function(data, status){
    console.log(data, status);
    $scope.contacts = [];
  });}else{
    
    $scope.contacts = [];
  }
  
$scope.addRow = function(){		
	$http.post('/user/contato',{ "nome":$scope.nome, "endereco": $scope.endereco,"telfixo": $scope.telfixo,"telmovel": $scope.telmovel,"email": $scope.email, "obs":$scope.obs }).success(function(data){$scope.contacts.push(data);});
	$scope.nome='';
	$scope.telfixo='';
	$scope.telmovel='';
	$scope.email='';
	$scope.endereco='';
	$scope.obs='';
};
$scope.removeRow = function(index){				
	  var contato = $scope.contacts[index];
    $http({method: 'DELETE', url: '/user/contato'+contato._id}).success(function(){
    $scope.contacts.splice(index, 1);
    $scope.reset();
  });
	};
$scope.showEditRow = function (r,c) {
    $scope.active = r;
    $scope.contacts.selected = angular.copy(r);
    $scope.actual=c;
    $scope.adic='';
  };
$scope.saveContact = function (idx) {
        console.log("Saving contact" + idx);
        var contato2 = $scope.contacts[idx];
        $http({method: 'PUT', url: '/user/contato'+contato2._id , data:{ "nome":$scope.contacts.selected.nome,"endereco":$scope.contacts.selected.endereco,"telfixo":$scope.contacts.selected.telfixo,"telmovel":$scope.contacts.selected.telmovel, "email": $scope.contacts.selected.email, "obs":$scope.contacts.selected.obs }}).success(function(){
        $scope.contacts[idx] = angular.copy($scope.contacts.selected);
        });
        //$scope.reset();
    };
$scope.reset = function () {
        $scope.contacts.selected = {};
        $scope.active = null;
    };
}])
    
;

