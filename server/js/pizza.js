var Pizza = function (id, name, price, ingredients) {
    this.id = id;
    this.name = name;
    this.price = price;
	this.quantity = 0;
    this.ingredients = ingredients;
    this.removed = [];
    this.extras = [];

};

Pizza.availableIngredients = [];


Pizza.prototype.getPrice = function () {
    var thisPizza = this; //needed for getIngredient to work
    var total = thisPizza.price;
    for (var id in thisPizza.extras) {
        var extra = thisPizza.extras[id];
        total += extra.quantity * thisPizza.getIngredient(extra.id).price;
    }
    return total;
};



Pizza.prototype.getIngredient = function(id) {
        return Pizza.availableIngredients.find(
               /* jshint loopfunc: true */ 
               function(ingredient) { return ingredient.id === id; });
};


Pizza.prototype.printableIngredients = function() {
    var thisPizza = this; //needed for getIngredient to work
    return (thisPizza.ingredients.map( function(id) { return thisPizza.getIngredient(id).label; })
            ).join(', ');
};


Pizza.prototype.printableCustomizations = function() {
    var thisPizza = this; //needed for getIngredient to work
    var msg = '';
    if(typeof thisPizza.removed != "undefined" && thisPizza.removed !== null && thisPizza.removed.length > 0){
        msg += 'removed: ';
        msg += (thisPizza.removed.map( function(id) { return thisPizza.getIngredient(id).label; })).join(', ');
    }
    if(typeof thisPizza.extras != "undefined" && thisPizza.extras !== null && thisPizza.extras.length > 0){        
        if(msg !== '') {
            msg += '; ';
        }
        msg += 'added: ';
        msg += (thisPizza.extras.map( function(obj) { 
            return  (obj.quantity === 1 ? '' : obj.quantity + 'x ') + thisPizza.getIngredient(obj.id).label; })).join(', ');
    }
    if (msg !== '') {
        msg = ' ['+ msg + ']';
    }
    return msg;

};


Pizza.prototype.getAvailableIngredients = function() {
    return Pizza.availableIngredients;
};

Pizza.prototype.removeIngredient = function(ingredient) {
    this.removed.push(ingredient);
    var index = this.ingredients.indexOf(ingredient);
    if(index != -1) {
        this.ingredients.splice( index, 1 );
    }
};
  
    
Pizza.prototype.addExtras = function(ingredientId) {
    var index = this.extras.map(function(ingredient) { return ingredient.id; }).indexOf(ingredientId);
    if(index === -1) {
        this.extras.push({ id : ingredientId, quantity : 0});
        index = this.extras.map(function(ingredient) { return ingredient.id; }).indexOf(ingredientId);
    }
    this.extras[index].quantity +=1;
    
};


Pizza.prototype.clearExtraIfNeeded = function (ingredientId) {
    var index = this.extras.map(function(ingredient) { return ingredient.id; }).indexOf(ingredientId);
    if(index != -1 && this.extras[index].quantity <= 0) {
        delete this.extras[index] ;
    }

};

Pizza.prototype.cloneForCustomization = function() {
    var newPizza = new Pizza(this.id, this.name, this.price, this.ingredients.slice(0));
    //newPizza.removed = pizza.removed.slice(0);
    //newPizza.extras
    
    return newPizza;
};