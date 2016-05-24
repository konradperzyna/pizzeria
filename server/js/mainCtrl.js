angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory, basket) {
    
    $scope.errorMessage ="";
    $scope.menu;
    $scope.basket = basket; 
    
    dataFactory.getMenu().then(function (menu) {
        $scope.menu = menu;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    $scope.printableIngredients = function(pizza) {
        return (pizza.ingredients.map(function(x) { return x.label;})).join(', ');
    };
           
 });
