angular.module('pizzeria').controller('PizzaCustomizationCtrl', function ($scope, dataFactory, basket) {
    $scope.errorMessage = "";
    $scope.basket = basket; 
    $scope.pizza.extras = {};
    $scope.pizza.removed = [];
    
    $scope.removeIngredient = function(ingredient) {
        $scope.pizza.removed.push(ingredient);
        var index = $scope.pizza.ingredients.indexOf(ingredient);
        if(index != -1) {
            $scope.pizza.ingredients.splice( index, 1 );
        }
    };
    
    $scope.addExtras = function(ingredientId) {
        if (!(ingredientId in $scope.pizza.extras)) { 
            $scope.pizza.extras[ingredientId] = { id : ingredientId, quantity : 0};
        }
        $scope.pizza.extras[ingredientId].quantity +=1;
    };
    
    $scope.clearIfNeeded = function (extraId) {
        if ($scope.pizza.extras[extraId] .quantity <= 0) {
            delete $scope.pizza.extras[extraId] ;
        }
    };

    $scope.extrasTotal = function() {
        var total = 0;
        for (var id in $scope.pizza.extras) {
            var extra = $scope.pizza.extras[id];
            total += extra.quantity * $scope.getIngredient(extra.id).price;
        }
        return total;

    };
    
});