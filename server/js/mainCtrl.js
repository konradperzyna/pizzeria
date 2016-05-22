angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory, basket) {
    
    $scope.errorMessage ="";
    $scope.menu;
    $scope.basket = basket; 
    
    dataFactory.getMenu().then(function (response) {
        $scope.menu = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    // $scope.addToBasket = function (pizza) {
    //     //console.log($scope.basket);
    //     console.log("Now service:")
    //     console.log(basket);
        
    //     if (!(pizza.id in basket)) {
    //         pizza.quantity = 0;
    //         basket[pizza.id] = pizza;
    //     }
    //     basket[pizza.id].quantity += 1;
    // };
    
     
    
    // $scope.isBasketEmpty = function() {
    //     return angular.equals({}, basket);
    // };
    
    
    // $scope.basketTotal = function() {
    //     var total = 0;
    //     for (var id in basket) {
    //         var pizza = basket[id];
    //         total += pizza.quantity * pizza.price;
    //     }
    //     return total;
    // };
            
 });
