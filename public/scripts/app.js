'use strict';
angular
    .module('ngSeedApp', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar'
    ])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home',{
                url:'/home',
                controller: 'HomeCtrl',
                templateUrl:'views/home.html'
            })
    }]);


