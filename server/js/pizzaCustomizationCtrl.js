angular.module('pizzeria').controller('PizzaCustomizationCtrl', function ($scope, dataFactory, basket) {
    $scope.errorMessage = "";
    $scope.basket = basket; 
    
    $scope.removeIngredient = function(ingredient) {
        console.log($scope.pizza.ingredients);
    };
    
});