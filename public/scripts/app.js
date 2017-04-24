'use strict';
angular
    .module('ngSeedApp', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngSanitize',
        'rzModule'
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
            .state('test3',{
              url:'/test3',
              controller: 'Test3Ctrl',
              templateUrl:'views/test3.html'
            })
            .state('test4',{
              url:'/test4',
              controller: 'Test4Ctrl',
              templateUrl:'views/test4.html'
            })
        //$urlRouterProvider.otherwise('/test1');
    }]);


