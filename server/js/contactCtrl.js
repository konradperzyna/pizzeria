angular.module('pizzeria').controller('ContactCtrl', function ($scope, dataFactory) {
    $scope.errorMessage = "";
    $scope.contactInfo = {};
    
    dataFactory.getContactInfo().then(function (response) {
        $scope.contactInfo = response.data;
    }, function (error) {
        $scope.errorMessage = 'Unable to load contact information: ' + error.message;
    });
    
});