angular.module('pizzeria').controller('OrderCtrl', function ($scope, $stateParams) {
    $scope.title = "Order";
    $scope.basket = $stateParams.basket;
});