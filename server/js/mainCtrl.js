angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory, basket, ngDialog) {
    
    $scope.errorMessage ="";
    $scope.menu = [] ;
    $scope.basket = basket; 
    
    dataFactory.getMenu().then(function (response) {
        $scope.menu = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    dataFactory.getIngredients().then(function (response) {
        $scope.ingredients = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load ingredients: ' + error.message;
    });
    
    
    $scope.getIngredient = function(id) {
        if(!$scope.ingredients) { 
           return {id : -1, label : '', price : ''};
        } else { 
           return $scope.ingredients.find(
               /* jshint loopfunc: true */ 
               function(ingredient) { return ingredient.id === id; }
                                      );
        }
    };
    
    $scope.printableIngredients = function(pizza) {
        return (pizza.ingredients.map( function(id) { return $scope.getIngredient(id).label; } )
               ).join(', ');
    };
    
    $scope.openCustomizePizzaDialog = function (pizza) {
        var dialogScope = $scope.$new();
        dialogScope.pizza = pizza;  
        dialogScope.getIngredient = $scope.getIngredient;      
        ngDialog.open({ template: '../partials/dialog.html', 
                        className: 'ngdialog-theme-default',
                        controller: 'PizzaCustomizationCtrl', 
                        scope: dialogScope});
    };
        

               
 });
