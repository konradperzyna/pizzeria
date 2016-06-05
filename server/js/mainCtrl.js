angular.module('pizzeria').controller('MainCtrl', function ($scope, $state, dataFactory, basket, ngDialog) {
    
    $scope.errorMessage ="";
    $scope.menu = [] ;
    $scope.basket = basket; 
    
    console.log($state);
    
    dataFactory.getMenu().then(function (menu) {
        var menuSorted = menu.slice();
            
        menuSorted.sort(function(a, b) {
            return a.ingredients.length - b.ingredients.length;
        });
        
        $scope.menu = menuSorted;
    }, function (error) {
        $scope.errorMessage = 'Unable to load menu: ' + error.message;
    });
    
    
    $scope.openCustomizePizzaDialog = function (pizza) {
        var dialogScope = $scope.$new();
        dialogScope.pizza = pizza.cloneForCustomization();  
        ngDialog.open({ template: '../partials/dialog.html', 
                        className: 'ngdialog-theme-default',
                        controller: 'PizzaCustomizationCtrl', 
                        scope: dialogScope});
    };
        
               
 });
