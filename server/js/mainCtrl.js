angular.module('pizzeria').controller('MainCtrl', function ($scope, dataFactory, basket, ngDialog) {
    
    $scope.errorMessage ="";
    $scope.menu = [] ;
    $scope.basket = basket; 
    
    dataFactory.getMenu().then(function (menu) {
        $scope.menu = menu;
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
