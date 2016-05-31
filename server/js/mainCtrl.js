angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory, basket, ngDialog) {
    
    $scope.errorMessage ="";
    $scope.menu = [] ;
    $scope.basket = basket; 
    
    dataFactory.getMenu().then(function (menu) {
        $scope.menu = menu;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    dataFactory.getIngredients().then(function (response) {
        console.log(response);
        $scope.ingredients = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load ingredients: ' + error.message;
    });
    
    
    $scope.printableIngredients = function(pizza) {
        return (pizza.ingredients.map(function(x) { return x.label;})).join(', ');
    };
    
    $scope.openCustomizePizzaDialog = function (pizza) {
        var dialogScope = $scope.$new();
        dialogScope.pizza = pizza;        
        ngDialog.open({ template: '../partials/dialog.html', 
                        className: 'ngdialog-theme-default',
                        controller: 'PizzaCustomizationCtrl', 
                        scope: dialogScope});
    };
        

               
 });
