angular.module('pizzeria').service('basket', function () {
    var basket = this;
    basket.content = [];
    

    basket.addItem = function (pizza) {
        var index = basket.content.indexOf(pizza);
        
        if (index == -1) {
            pizza.quantity = 0;
            basket.content.push(pizza);
            index = basket.content.indexOf(pizza);
        }
        basket.content[index].quantity += 1;
    };
    
    
    basket.clearIfNeeded = function (pizza) {
        if (basket.content[pizza.id].quantity <= 0) {
            delete basket.content[pizza.id];
        }
    };
    
    basket.isEmpty = function() {
        return angular.equals({}, basket.content);
    };
    
    
    basket.getTotal = function() {
        var total = 0;
        for (var id in basket.content) {
            var pizza = basket.content[id];
            total += pizza.getPrice();
        }
        return total;
    };

});