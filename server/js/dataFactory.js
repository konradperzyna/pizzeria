angular.module('pizzeria').factory('dataFactory', ['$http', function($http) {

    var urlBase = './menu';
    var dataFactory = {};

    dataFactory.getMenu = function () {
        return $http.get('./menu');
    };

    dataFactory.getOrderStatus = function (orderId) {
        return $http.get('./order/'+ orderId);
    };
    
    dataFactory.getContactInfo = function () {
        return $http.get('./contact');
    };

    return dataFactory;
}]);