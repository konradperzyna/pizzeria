angular.module('pizzeria').controller('PizzaCustomizationCtrl', function ($scope, dataFactory, basket) {
    $scope.basket = basket; 

    $scope.addToBasket = function() {
        basket.addItem($scope.pizza);
        $scope.closeThisDialog();
    };        
    
});