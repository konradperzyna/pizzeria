angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory) {
    
    $scope.errorMessage;
    $scope.menu;
    
    dataFactory.getMenu().then(function (response) {
        $scope.menu = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
            
 });
