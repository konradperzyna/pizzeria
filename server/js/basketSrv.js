angular.module('pizzeria').service('basket', function () {
    var basket = this;
    basket.content = {};
    
    basket.addItem = function (pizza) {
        if (!(pizza.id in basket.content)) {
            pizza.quantity = 0;
            basket.content[pizza.id] = pizza;
        }
        basket.content[pizza.id].quantity += 1;
    };
    
     
    
    basket.isEmpty = function() {
        return angular.equals({}, basket.content);
    };
    
    
    basket.getTotal = function() {
        var total = 0;
        for (var id in basket.content) {
            var pizza = basket.content[id];
            total += pizza.quantity * pizza.price;
        }
        return total;
    };

});