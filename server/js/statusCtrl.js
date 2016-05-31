angular.module('pizzeria').controller('StatusCtrl', function ($scope, $state, $stateParams, dataFactory) {
    $scope.orderId = $stateParams.orderId;
    $scope.title = "Status of order: "+$stateParams.orderId;
    
    $scope.errorMessage = "";
    $scope.orderStatus = {};
    $scope.menu = {};
    $scope.estimateTime = null;
    $scope.status = null;
    
    dataFactory.getOrderStatus($stateParams.orderId).then(function (response) {
        $scope.orderStatus = response.data;
        
        dataFactory.getMenu().then(function(response) {
            $scope.menu = response;
        }, function(error) {
            $scope.errorMessage = 'Unable to load all order details: ' + error.message;
        });
        
        var timeLeft = (new Date($scope.orderStatus.estimated)).getTime() - Date.now();
        $scope.estimateTime = timeLeft > 0 ? '~' + parseInt(timeLeft / 1000 / 60) + ' minutes' : 'already finished!';
        $scope.status = $scope.orderStatus.status;
    }, function (error) {
        $scope.errorMessage = 'Unable to load order number ' + $stateParams.orderId +': ' + error.message;
    });
});