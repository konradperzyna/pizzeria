angular.module('pizzeria').controller('OrderCtrl', function ($scope, $stateParams, basket) {
    $scope.title = "Order";
    $scope.basket = basket;
    console.log(basket);
});