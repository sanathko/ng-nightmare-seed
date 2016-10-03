/**
 * Created by sanathkodikara on 8/06/2016.
 */
angular.module('ngSeedApp').controller('TestCtrl', function ($scope, $timeout,$http) {
    $scope.songLines = [];
    $http.get('/scripts/controllers/sinhalasong.txt').then(function(value) {
        console.log('**',value.data);
    });
});