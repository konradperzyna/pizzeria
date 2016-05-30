angular.module('pizzeria').controller('OrderCtrl', function ($scope, $state, basket, dataFactory) {
    $scope.title = "Your Order";
    $scope.basket = basket;
    $scope.errorMessage = null;
    console.log(basket);
    
    $scope.isDisabled = true;
    
    $scope.submit = function() {
        dataFactory.sendOrder(basket, {
            phone: $scope.phone,
            street: $scope.street,
            remarks: $scope.remarks
        }).then(function(res) {
            basket.content = {};
            $state.go('status', {orderId: res.data.id});
        }, function(error) {
            $scope.errorMessage = "Unable to send your order: " + error.message;
        });
    };
    
    $scope.back = function() {
        window.history.back();
    };
    
    $scope.validate = function() {
        $scope.isDisabled = ($scope.orderForm.phone.$valid && $scope.orderForm.street.$valid) ? false
            : true;
    };
});