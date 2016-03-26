angular.module('ngSeedApp').factory('APIService', function ($http){
    var dbService = {};
    var appUrl = "http://localhost:1999/api/";

    dbService.get = function(url, config){
        return $http.get(appUrl + url, config);
    }

    dbService.post = function(url,body, config){
        console.log('posting to ',url,body);
        return $http.post(appUrl + url,body, config);
    }

    dbService.put = function(url, body, config){
        return $http.put(appUrl + url, body, config);
    }

    dbService.delete = function(url, config){
        return $http.delete(appUrl + url, config);
    }
    return dbService;
});