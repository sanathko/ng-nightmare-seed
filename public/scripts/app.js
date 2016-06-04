'use strict';
angular
    .module('ngSeedApp', [
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar'
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
        $urlRouterProvider.otherwise('/home');
    }]);


