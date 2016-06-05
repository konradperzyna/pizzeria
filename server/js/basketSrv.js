angular.module('pizzeria').service('basket', function ($state) {
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
        basket.content.forEach(function(value, index) {
            if(value.$$hashKey === pizza.$$hashKey && value.quantity <= 0) {
                basket.content.splice(index, 1);
            }
        });
        console.log(basket);
    };
    
    basket.isEmpty = function() {
        return angular.equals([], basket.content);
    };
    
    
    basket.getTotal = function() {
        var total = 0;
        for (var id in basket.content) {
            var pizza = basket.content[id];
            total += pizza.getPrice();
        }
        return total;
    };
    
    basket.readOnly = function() {
        return $state.current.url == "/order" ? true : false;
    };
});