'use strict';
angular
    .module('ngSeedApp', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngSanitize'
    ])
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('song',{
                url:'/song',
                controller: 'ReadSongCtrl',
                templateUrl:'views/song.html'
            })
            .state('home',{
                url:'/home',
                controller: 'HomeCtrl',
                templateUrl:'views/home.html'
            })
            .state('test',{
                url:'/test',
                controller: 'TestCtrl',
                templateUrl:'views/test.html'
            })
            .state('test1',{
                url:'/test1',
                controller: 'Test1Ctrl',
                templateUrl:'views/test1.html'
            })
            .state('test2',{
                url:'/test2',
                controller: 'Test2Ctrl',
                templateUrl:'views/test2.html'
            })
        $urlRouterProvider.otherwise('/test1');
    }]);


