/**
 * Created by skodikara on 15/07/15.
 */
angular.module('ngSeedApp').factory('TestService', function (APIService){
    var testService = {};

    testService.get = function(url, config){
        return APIService.get(url, config);
    }

    testService.post = function(url, body, config){
        return APIService.post(url, body, config);
    }

    return testService;
});
