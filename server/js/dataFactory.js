angular.module('pizzeria').factory('dataFactory', ['$http', '$q', function($http, $q) {

    var urlBase = './menu';
    var dataFactory = {};

    // dataFactory.getMenu = function () {
    //     return $q.all({
    //         'menu' : $http.get('./menu'),
    //         'ingredients' : $http.get('./ingredients')
    //     }).then(function (response) {
    //         var menu = response.menu.data;
    //         var ingredients = response.ingredients.data;
    //         for (var id in menu) {
    //             var pizza = menu[id];
    //             for (var arrayId in pizza.ingredients) {
    //                 var ingredientId = pizza.ingredients[arrayId];
    //                 pizza.ingredients[arrayId] = ingredients.find(/* jshint loopfunc: true */ function(x) {return x.id === ingredientId;});
    //             }
    //         }
    //         return menu;
    //     });
    // };
    
    
    dataFactory.getMenu = function () {
        return $http.get('./menu');
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
    
    dataFactory.sendOrder = function(basket, form) {
        var order = {
            order: [],
            extras: [],
            orderInfo: {}
        };
        
        Object.keys(basket.content).map(function (key) {return basket.content[key];})
        .forEach(function(pizza) {
            order.order.push({
                id: pizza.id,
                quantity: pizza.quantity
            });
        });
        
        order.orderInfo = form;
        
        return $http.post('./order', order);
    };

    return dataFactory;
}]);