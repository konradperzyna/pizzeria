angular.module('pizzeria').factory('dataFactory', ['$http', '$q', function($http, $q) {

    var urlBase = './menu';
    var dataFactory = {};

    dataFactory.getMenu = function () {
        return $q.all({
            'menu' : $http.get('./menu'),
            'ingredients' : $http.get('./ingredients')
        }).then(function (response) {
            var menu = response.menu.data;
            var ingredients = response.ingredients.data;
            for (var id in menu) {
                var pizza = menu[id];
                for (var arrayId in pizza.ingredients) {
                    var ingredientId = pizza.ingredients[arrayId];
                    pizza.ingredients[arrayId] = ingredients.find(/* jshint loopfunc: true */ function(x) {return x.id === ingredientId;});
                }
            }
            return menu;
        });
    };
    
    

    dataFactory.getIngredients = function () {
        return $http.get('./ingredients');
    };

    dataFactory.getOrderStatus = function (orderId) {
        return $http.get('./order/'+ orderId);
    };
    
    dataFactory.getContactInfo = function () {
        return $http.get('./contact');
    };

    return dataFactory;
}]);