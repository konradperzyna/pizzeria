angular.module('pizzeria').controller('StatusCtrl', function ($scope, $state, $stateParams, dataFactory) {
    $scope.orderId = $stateParams.orderId;
    $scope.title = "Status of order "+$stateParams.orderId;
    
    $scope.errorMessage;
    $scope.orderStatus;
    
    dataFactory.getOrderStatus($stateParams.orderId).then(function (response) {
        $scope.orderStatus = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load order number ' + $stateParams.orderId +': ' + error.message;
    });
});