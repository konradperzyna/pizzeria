angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory) {
    
    $scope.errorMessage;
    $scope.menu;
    $scope.basket = {}; 
    
    dataFactory.getMenu().then(function (response) {
        $scope.menu = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    $scope.addToBasket = function (pizza) {
        if (!(pizza.id in $scope.basket)) {
            pizza.quantity = 0;
            $scope.basket[pizza.id] = pizza;
        }
        $scope.basket[pizza.id].quantity += 1;
    };
    
     
    
    $scope.isBasketEmpty = function() {
        return angular.equals({}, $scope.basket);
    };
    
    
    $scope.basketTotal = function() {
        var total = 0;
        for (var id in $scope.basket) {
            var pizza = $scope.basket[id];
            total += pizza.quantity * pizza.price;
        }
        return total;
    };
            
 });
