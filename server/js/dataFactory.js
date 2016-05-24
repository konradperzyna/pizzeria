angular.module('pizzeria').factory('dataFactory', ['$http', '$q', function($http, $q) {

    var urlBase = './menu';
    var dataFactory = {};

    dataFactory.getMenu = function () {
        return $q.all({
            'menu' : $http.get('./menu'),
            'ingredients' : $http.get('./ingredients')
        }).then(function (response) {
            menu = response.menu.data;
            ingredients = response.ingredients.data;
            for (pizza of menu) {
                for (arrayId in pizza.ingredients) {
                    ingredientId = pizza.ingredients[arrayId];
                    pizza.ingredients[arrayId] = ingredients.find( function(x) {return x.id = ingredientId;});
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