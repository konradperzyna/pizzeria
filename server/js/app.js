angular.module('pizzeria', ['ui.router']).config(/* @ngInject */ function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/main',
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .state('order', {
            url: '/order',
            templateUrl: 'partials/order.html',
            controller: 'OrderCtrl'
        })
        .state('status', {
            url: '/status/:orderId',
            templateUrl: 'partials/status.html',
            controller: 'StatusCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        });
    $urlRouterProvider.otherwise('/main');
});
